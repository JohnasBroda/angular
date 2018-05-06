import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { StorageSvc } from './storage.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { User } from '@store/user/model';
import * as firebase from 'firebase/app';
import { Store } from '@ngrx/store';
import { IAppState } from 'app/app.states';

@Injectable()
export class FacebookAuthService extends AuthService {

  private facebookProvider = new firebase.auth.FacebookAuthProvider();

  constructor(
    protected store: Store<IAppState>,
    protected afAuth: AngularFireAuth,
    protected db: AngularFireDatabase,
    protected router: Router,
    protected storage: StorageSvc) {

    super(store, afAuth, db, router, storage);
  }

  public logIn(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signInWithPopup(this.facebookProvider));
  }

  public createUser(snapshot: any): User {
    const info = snapshot.additionalUserInfo.profile;
    const user = new User(
      snapshot.user.uid,
      info.email,
      snapshot.user.displayName,
      snapshot.additionalUserInfo.providerId,
      null,
      false,
      null,
      snapshot.user.phone || null,
      info.picture,
      snapshot.user.isAnonymous,
      this.checkForAdmin(snapshot.user.email),
      snapshot.user.metadata.creationTime,
      snapshot.user.metadata.lastSignInTime,
      false,
      false,
      [],
      info.locale);
    return user;
  }
}
