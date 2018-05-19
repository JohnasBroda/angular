import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { StorageSvc } from '@services/utils/storage.service';
import { User } from '../../store/auth/model';
import { IAppState } from '@store/app.states';


@Injectable()
export class GoogleAuthService extends AuthService {

  private googleProvider = new firebase.auth.GoogleAuthProvider();

  constructor(
    protected store: Store<IAppState>,
    protected afAuth: AngularFireAuth,
    protected db: AngularFireDatabase,
    protected router: Router,
    protected storage: StorageSvc) {

    super(store, afAuth, db, router, storage);
  }

  public logIn(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signInWithPopup(this.googleProvider));
  }

  public createUser(snapshot): User {
    const user = new User(
      snapshot.user.uid,
      snapshot.user.email,
      snapshot.user.displayName,
      snapshot.additionalUserInfo.providerId,
      null,
      false,
      null,
      snapshot.additionalUserInfo.profile.phoneNumber || null,
      snapshot.additionalUserInfo.profile.picture,
      snapshot.user.isAnonymous,
      this.checkForAdmin(snapshot.user.email),
      snapshot.user.metadata.creationTime,
      snapshot.user.metadata.lastSignInTime,
      false,
      false,
      [],
      (navigator as Navigator).language);
    return user;
  }
}
