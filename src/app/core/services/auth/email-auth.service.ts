import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { StorageSvc } from '@services/utils/storage.service';
import { User } from '../../store/auth/model';
import { IAppState } from '@store/app.states';

@Injectable()
export class EmailAuthService extends AuthService {

  private googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(
    protected store: Store<IAppState>,
    protected afAuth: AngularFireAuth,
    protected db: AngularFireDatabase,
    protected router: Router,
    protected storage: StorageSvc) {

    super(store, afAuth, db, router, storage);
  }

  public logIn(email, password) {
    return Observable.fromPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  public register(user: any) {
    return Observable.fromPromise(this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password));
  }

  public saveUser(user: User, snapshot: any): User {
    console.log(user);
    const userToSave = this.createUserWithEmail(user, snapshot);
    this.db.database.ref(`users/${snapshot.uid}`).set(userToSave);
    return user;
  }

  private createUserWithEmail(user: User, snapshot: any): User {
    return new User(
      snapshot.uid,
      user.email,
      user.displayName,
      'email',
      null,
      false,
      user.password,
      user.phoneNumber,
      null,
      snapshot.isAnonymous,
      this.checkForAdmin(user.email),
      snapshot.metadata.creationTime,
      snapshot.metadata.lastSignInTime,
      false,
      false,
      [],
      (navigator as Navigator).language);
  }
}
