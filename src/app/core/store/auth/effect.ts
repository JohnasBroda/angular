import { EmailAuthService } from './../../../services/email-auth.service';
import { AuthActionTypes, All } from './actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { GoogleAuthService } from 'app/services/google-auth.service';
import { FacebookAuthService } from 'app/services/facebook-auth.service';
import { AuthProvider, AuthService} from 'app/services/auth.service';
import * as authActions from './actions';
import { tap } from 'rxjs/operators/tap';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@store/user/model';
import { AngularFireDatabase } from 'angularfire2/database';

export type Action = authActions.All;

@Injectable()
export class AuthEffects {

    @Effect()
    getUser$: Observable<Action> = this.actions$.pipe(
        ofType(AuthActionTypes.GET_USER),
        map((action: authActions.GetUser) => action.payload),
        tap(payload => this.payload = payload),
        switchMap(payload => this.afAuth.authState.pipe(take(1))),
        switchMap(authData => [
            this.isAuthenticated(authData),
            this.isVerified(this.payload)
        ]),
        tap(() => this.auth.setStorageAndNavigate()),
        catchError(err => Observable.of(new authActions.LoginError(err)))
    );

    @Effect()
    loginGoogle$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LOGIN_GOOGLE),
        map((action: authActions.LoginGoogle) => action.payload),
        tap(payload => {
            this.provider = payload.provider;
            this.anonPushKey = this.auth.switchFromAnonUser();
        }),
        switchMap(payload => this.googleAuth.logIn()),
        tap(authData => this.authData = authData),
        switchMap(authData => this.auth.queryExistingUser(authData.user.uid)),
        map(snapshot => snapshot.val() ? snapshot.val() : this.handleFirstLogIn(this.authData)),
        map(user => new authActions.GetUser(user)),
        catchError(error => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect()
    loginFacebook$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LOGIN_FACEBOOK),
        map((action: authActions.LoginFacebook) => action.payload),
        tap(payload => {
            this.provider = payload.provider;
            this.anonPushKey = this.auth.switchFromAnonUser();
        }),
        switchMap(payload => this.facebookAuth.logIn()),
        tap(authData => this.authData = authData),
        switchMap(authData => this.auth.queryExistingUser(authData.user.uid)),
        map(snapshot => snapshot.val() ? snapshot.val() : this.handleFirstLogIn(this.authData)),
        map(user => new authActions.GetUser(user)),
        catchError(error => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect()
    loginEmail$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LOGIN_EMAIL),
        map((action: authActions.LoginEmail) => action.payload),
        tap(payload => {
            this.provider = payload.provider;
            this.anonPushKey = this.auth.switchFromAnonUser();
        }),
        switchMap(payload => this.emailAuth.logIn(payload.email, payload.password)),
        switchMap(authData => this.auth.queryExistingUser(authData.uid)),
        map(snapshot => snapshot.val()),
        map(user => new authActions.GetUser(user)),
        catchError(error => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect()
    registerEmail$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.REGISTER_EMAIL),
        map((action: authActions.RegisterEmail) => action.payload),
        tap(payload => this.payload = payload),
        switchMap(payload => this.emailAuth.register(payload)),
        map(authData => this.emailAuth.saveUser(this.payload.user, authData)),
        map(user => new authActions.LoginEmail({ email: user.email, password: user.password, provider: AuthProvider.email })),
        catchError(error => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect({ dispatch: false })
    logout$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.LOGOUT),
        tap(() => this.auth.logOut()),
    );

    @Effect()
    verifyRegistration$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.VERIFY_REGISTRATION),
        map((action: authActions.VerifyRegistration) => action.payload),
        tap(payload => this.payload = payload),
        switchMap(payload => this.auth.verifyRegistration(payload)),
        map(authDatat => new authActions.UpdateUser(this.payload)),
        catchError(error => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
    );

    @Effect({ dispatch: false })
    updateUser$: Observable<Action> = this.actions$.pipe(
        ofType(authActions.AuthActionTypes.UPDATE_USER),
        tap((action: authActions.UpdateUser) => this.auth.updateUser(action.payload)),
        catchError(error => of({ type: AuthActionTypes.LOGIN_ERROR, payload: error })),
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
            return new authActions.Authenticated(this.payload);
        }
        return new authActions.NotAuthenticated();
    }

    private isVerified(user: User) {
        console.log(user);
        if (!user.emailVerified && !user.verificationSent) {
            return new authActions.VerifyRegistration(this.payload);
        }
        return new authActions.Authenticated(this.payload);
    }
}
