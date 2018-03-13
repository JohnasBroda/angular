import { StorageSvc } from './storage.service';
import { CustomValidators } from './../components/login-form-component/validators';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { User } from './../interfaces/User';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Promise, reject } from 'q';
import { RouterStateSnapshot } from '@angular/router';
import { RouterState } from '@angular/router';
import { NavigationExtras } from '@angular/router/src/router';
import { Navigation } from 'selenium-webdriver';

@Injectable()
export class FireAuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private storage: StorageSvc) { }

  public loginError: Error;
  public currentUser: User = new User();
  private userRef: AngularFireList<{}>;
  private userSub: Subscription;
  public authSub: Subscription;
  public registeredUser;
  private googleProvider = new firebase.auth.GoogleAuthProvider();

  public signInWithGooglePopUp() {
    this.afAuth.auth.signInWithPopup(this.googleProvider)
      .then(result => {
        this.currentUser.uid = result.user.uid;
        this.userSub = this.queryExistingUser().subscribe(response => {
          response ? this.currentUser = response[0] : this.registeredUser = response[0];

          this.authSub = this.afAuth.authState.subscribe((user: firebase.User) => {

            if (!this.currentUser) {
              this.currentUser = this.handleUserCreationForGoogle(result);
              this.userRef.update(this.currentUser.uid, this.currentUser);
            }

            if (user && user.uid === this.currentUser.uid) {
              this.storage.set('currentUser', this.currentUser);
              this.router.navigate(['/users', this.currentUser.uid]);
            } else {
              this.router.navigate(['']);
              return false;
            }
          });
        });
      });
  }

  public signOut() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    localStorage.removeItem('currentUser');
    this.currentUser = new User();
    this.afAuth.auth.signOut().then(() => this.router.navigate(['']));
  }

  public signInWithEmail(email, password, extras?) {
    return Promise((resolve, rejection) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
          this.authSub = this.afAuth.authState.subscribe(observer => {
            if (!this.currentUser.uid) {
              this.currentUser.uid = response.uid;
            }
            this.userSub = this.queryExistingUser().subscribe(user => {
              if (!this.currentUser.email) {
                this.currentUser = user[0];
              }

              if (!this.currentUser.emailVerified && !this.currentUser.verificationSent) {
                const config: firebase.auth.ActionCodeSettings = {
                  url: `http://localhost:4200/users/${this.currentUser.uid}?emailVerified=true`
                };
                this.afAuth.auth.currentUser.sendEmailVerification(config).then(x => {
                  this.currentUser.verificationSent = true;
                  this.userRef.update(this.currentUser.uid, this.currentUser);
                  this.afAuth.auth.currentUser.linkWithRedirect(this.googleProvider);
                });
              }
              this.setStorageAndNavigate(extras);
            });
          });
        }).catch(error => {
          console.log(error);
          this.loginError = error;
          rejection(this.loginError);
        });
    });
  }

  registerWithEmail(user: User) {
    const promise = Promise((resolve, rejection) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(response => {
          this.handleUserCreationForEmail(user, response);
          this.queryExistingUser();
          this.userRef.update(this.currentUser.uid, this.currentUser).then(() => {
            const extras: NavigationExtras = {
              queryParams: {
                isNewUser: true,
                emailVerified: false,
              }
            };
            this.signInWithEmail(user.email, user.password, extras);
          });
        }).catch(errors => {
          rejection(errors);
        });
    });
    return promise;
  }

  private setStorageAndNavigate(extras?: NavigationExtras) {
    this.storage.set('currentUser', this.currentUser);
    this.router.navigate(['/users', this.currentUser.uid], extras);
  }

  public signInAsAnonymous() {
    return this.afAuth.auth.signInAnonymously().then(response => {
      this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
        this.currentUser = this.createAnonymousUser(user);
      });
    }, error => {
      console.log(error);
    });
  }

  public queryExistingUser(): Observable<any> {
    this.userRef = this.db.list(`users`);
    return this.userRef.valueChanges();
  }

  private handleUserCreationForGoogle(result): User {
    const info = result.additionalUserInfo.profile;
    const user = new User();
    user.uid = result.user.uid;
    user.firstName = info.given_name;
    user.lastName = info.family_name;
    user.email = info.email;
    user.emailVerified = info.verified_email;
    user.provider = result.additionalUserInfo.providerId;
    user.photoURL = info.picture;
    user.phoneNumber = result.user.phone || '';
    user.creationTime = result.user.metadata.creationTime;
    user.lastSignInTime = result.user.metadata.lastSignInTime;
    user.locale = info.locale;
    user.isAdmin = true;
    user.isAnonymous = result.user.isAnonymous;
    return user;
  }

  private handleUserCreationForEmail(user: User, response) {
    user.creationTime = response.metadata.creationTime;
    user.emailVerified = response.emailVerified;
    user.isAdmin = false;
    user.isAnonymous = response.isAnonymous;
    user.lastSignInTime = response.metadata.lastSignInTime;
    user.uid = response.uid;
    user.locale = (navigator as Navigator).language;
    this.currentUser = user;
  }

  private createAnonymousUser(user) {
     return {
      uid: user.uid,
      isAdmin: false,
      isAnonymous: user.isAnonymous,
      creationTime: new Date(user.metadata.creationTime),
      provider: 'anonymous',
    };
  }
}
