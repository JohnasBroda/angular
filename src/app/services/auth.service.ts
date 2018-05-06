import { FacebookAuthService } from "./facebook-auth.service";
import { EmailAuthService } from "./email-auth.service";
import { selectUser } from "@store/auth/reducer";
import { IAppState } from "app/app.states";
import { StorageSvc } from "./storage.service";
import { CustomValidators } from "./../components/login-form-component/validators";
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { Subscription } from "rxjs/Subscription";
import { AngularFireList } from "angularfire2/database/interfaces";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { Observable } from "rxjs/Observable";
import { AngularFireDatabase } from "angularfire2/database";
import { RouterStateSnapshot } from "@angular/router";
import { RouterState } from "@angular/router";
import { NavigationExtras } from "@angular/router/src/router";
import { Navigation, promise } from 'selenium-webdriver';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '@store/user/model';
import { Store } from '@ngrx/store';
import { GoogleAuthService } from 'app/services/google-auth.service';
import { AnonAuthService } from 'app/services/anon-auth.service';
import { environment } from '@environments/environment';

export enum AuthProvider {
  anonymous,
  email,
  facebook,
  google
}

export enum LoginMode {
  popUp,
  redirect,
  InPlace,
  phone
}

@Injectable()
export abstract class AuthService {
  protected currentUser$: Observable<User>;
  protected userRef: AngularFireList<{}>;
  protected userSub: Subscription;
  protected authSub: Subscription;
  protected loginMode: LoginMode;

  constructor(
    protected store: Store<IAppState>,
    protected afAuth: AngularFireAuth,
    protected db: AngularFireDatabase,
    protected router: Router,
    protected storage: StorageSvc
  ) {
    this.currentUser$ = this.store.select(selectUser);
  }

  protected logIn(email?, password?, extras?): Observable<boolean | Error> {
    return Observable.of(true);
  }

  public logOut() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    localStorage.removeItem('currentUser');
    this.afAuth.auth.signOut();
    this.router.navigate(['']);
  }

  public verifyRegistration(user: User) {
    console.log(user);
    const config: firebase.auth.ActionCodeSettings = {
      url: `http://localhost:4200/users/${user.uid}?emailVerified=true`
    };
    return Observable.fromPromise(
      this.afAuth.auth.currentUser.sendEmailVerification(config)
    );
  }

  public setStorageAndNavigate(extras?: NavigationExtras) {
    const sub = this.currentUser$.subscribe(user => {
      this.storage.set('currentUser', user);
      this.router.navigate(['/users', user.uid], extras);
    });
    sub.unsubscribe();
  }

  // Used by the http interceptor to set the auth header
  public getUserIdToken(): Observable<string> {
    const currentUser = this.afAuth.auth.currentUser;
    let tokenPromise: Promise<any>;
    if (currentUser) {
      tokenPromise = currentUser.getIdToken();
    } else {
      tokenPromise = new Promise((resolve, reject) => resolve(null));
    }
    return Observable.fromPromise(tokenPromise);
  }

  public queryExistingUser(uid: string) {
    return this.db.database.ref(`users/${uid}`).once('value');
  }

  protected checkForAdmin(email) {
    let bool;
    email === 'arvo.wow@gmail.com' ? (bool = true) : (bool = false);
    return bool;
  }

  public switchFromAnonUser(): string | null {
    let $key: string | null;
    const sub = this.currentUser$.subscribe(user => {
      if (user && user.uid) {
        this.afAuth.auth.signOut();
        $key = this.db.list('anonUsers').push(user).key;
      }
      $key = null;
    });
    sub.unsubscribe();
    return $key;
  }

  public updateUser(user: User) {
    user.verificationSent = true;
    console.log(user);
    this.db.object(`users/${user.uid}`).update(user);
  }

  public createUser(result?: any): User {
    return new User(null, null, 'Guest', 'anonymous');
  }

  ///// STRIPE CONNECT //////

  // Login popup window
  stripeLogin() {
    const popup = window.open(
      `${environment.functionsURL}/stripeRedirect`,
      '_blank',
      'height=700,width=800'
    );
  }

  // Signin with a custom token from
  customSignIn(token) {
    return this.afAuth.auth
      .signInWithCustomToken(token)
      .then(() => window.close());
  }

  protected getLoginPromise(
    provider?,
    email?,
    password?,
    phoneNumber?,
    appVerifier?
  ) {
    switch (this.loginMode) {
      case LoginMode.popUp: {
        return this.afAuth.auth.signInWithPopup(provider);
      }
      case LoginMode.redirect: {
        return this.afAuth.auth.signInWithRedirect(provider);
      }
      case LoginMode.InPlace: {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
      }
      case LoginMode.redirect: {
        return this.afAuth.auth.signInWithPhoneNumber(phoneNumber, appVerifier);
      }
    }
  }
}
