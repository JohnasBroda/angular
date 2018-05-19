import { AuthProvider } from './../../services/auth/auth.service';
import { FacebookAuthService } from './../../services/auth/facebook-auth.service';
import { EmailAuthService } from './../../services/auth/email-auth.service';
import { GoogleAuthService } from './../../services/auth/google-auth.service';
import {
    AuthActionTypes,
    All,
    GetUser,
    LoginError,
    LoginGoogle,
    LoginFacebook,
    LoginEmail,
    RegisterEmail,
    VerifyRegistration,
    UpdateUser,
    Authenticated,
    NotAuthenticated
} from './actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { User } from './model';
import { AuthService } from '../../services/auth/auth.service';


export type Action = All;

@Injectable()
export class AuthEffects {

    @Effect()
    public getUser$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.GET_USER),
        map((action: GetUser) => action.payload),
        tap((payload) => this.payload = payload),
        switchMap((payload) => this.afAuth.authState.pipe(take(1))),
        switchMap((authData) => [
            this.isAuthenticated(authData),
            this.isVerified(this.payload)
        ]),
        tap(() => this.auth.setStorageAndNavigate()),
        catchError((err) => Observable.of(new LoginError(err)))
    );

    @Effect()
    public loginGoogle$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_GOOGLE),
        map((action: LoginGoogle) => action.payload),
        tap((payload) => {
            this.provider = payload.provider;
            this.anonPushKey = this.auth.switchFromAnonUser();
        }),
        switchMap((payload) => this.googleAuth.logIn()),
        tap((authData) => this.authData = authData),
        switchMap((authData) => this.auth.queryExistingUser(authData.user.uid)),
        map((snapshot) => snapshot.val() ? snapshot.val() : this.handleFirstLogIn(this.authData)),
        map((user) => new GetUser(user)),
        catchError((error) => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect()
    public loginFacebook$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_FACEBOOK),
        map((action: LoginFacebook) => action.payload),
        tap((payload) => {
            this.provider = payload.provider;
            this.anonPushKey = this.auth.switchFromAnonUser();
        }),
        switchMap((payload) => this.facebookAuth.logIn()),
        tap((authData) => this.authData = authData),
        switchMap((authData) => this.auth.queryExistingUser(authData.user.uid)),
        map((snapshot) => snapshot.val() ? snapshot.val() : this.handleFirstLogIn(this.authData)),
        map((user) => new GetUser(user)),
        catchError((error) => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect()
    public loginEmail$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGIN_EMAIL),
        map((action: LoginEmail) => action.payload),
        tap((payload) => {
            this.provider = payload.provider;
            this.anonPushKey = this.auth.switchFromAnonUser();
        }),
        switchMap((payload) => this.emailAuth.logIn(payload.email, payload.password)),
        switchMap((authData) => this.auth.queryExistingUser(authData.uid)),
        map((snapshot) => snapshot.val()),
        map((user) => new GetUser(user)),
        catchError((error) => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect()
    public registerEmail$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.REGISTER_EMAIL),
        map((action: RegisterEmail) => action.payload),
        tap((payload) => this.payload = payload),
        switchMap((payload) => this.emailAuth.register(payload)),
        map((authData) => this.emailAuth.saveUser(this.payload.user, authData)),
        map((user) => new LoginEmail({ email: user.email, password: user.password, provider: AuthProvider.email })),
        catchError((error) => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect({ dispatch: false })
    public logout$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(() => this.auth.logOut()),
    );

    @Effect()
    public verifyRegistration$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.VERIFY_REGISTRATION),
        map((action: VerifyRegistration) => action.payload),
        tap((payload) => this.payload = payload),
        switchMap((payload) => this.auth.verifyRegistration(payload)),
        map((authDatat) => new UpdateUser(this.payload)),
        catchError((error) => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect({ dispatch: false })
    public updateUser$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.UPDATE_USER),
        tap((action: UpdateUser) => this.auth.updateUser(action.payload)),
        catchError((error) => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    private anonPushKey: string;
    private payload: any;
    private authData: any;
    private provider: any;

    constructor(
        private actions$: Actions,
        private afAuth: AngularFireAuth,
        private auth: AuthService,
        private db: AngularFireDatabase,
        private googleAuth: GoogleAuthService,
        private emailAuth: EmailAuthService,
        private facebookAuth: FacebookAuthService) { }

    public handleFirstLogIn(snapshot: any): User {
        const provider = this.getProvider(this.provider);
        const user = provider.createUser(snapshot);
        if (this.anonPushKey) {
            user.anonSessionKeys.push(this.anonPushKey);
        }
        this.db.database.ref(`users/${user.uid}`).set(user);
        return user;
    }

    private isAuthenticated(authData) {
        console.log(authData);
        if (authData) {
            return new Authenticated(this.payload);
        }
        return new NotAuthenticated();
    }

    private isVerified(user: User) {
        console.log(user);
        if (!user.emailVerified && !user.verificationSent) {
            return new VerifyRegistration(this.payload);
        }
        return new Authenticated(this.payload);
    }

    private getProvider(provider: AuthProvider): GoogleAuthService | FacebookAuthService {
        switch (provider) {
            case AuthProvider.facebook: {
                return this.facebookAuth;
            }
            case AuthProvider.google: {
                return this.googleAuth;
            }
        }
    }
}
