import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';
import { StorageSvc } from '@services/utils/storage.service';
import { IAppState } from '../../store/app.states';

@Injectable()
export class AnonAuthService extends AuthService {

  constructor(
    protected store: Store<IAppState>,
    protected afAuth: AngularFireAuth,
    protected db: AngularFireDatabase,
    protected router: Router,
    protected storage: StorageSvc) {

    super(store, afAuth, db, router, storage);
  }

  public signInAsAnonymous() {
    this.afAuth.auth.signInAnonymously()
    .then(response => {
      console.log(response);
      return this.afAuth.authState.toPromise();
    }).then((user: firebase.User) => {
      console.log(user);
      this.createAnonymousUser(user);
    }).catch(error => {
      console.log(error);
    });
  }

  private createAnonymousUser(user) {
    const anonUser = {
      uid: user.uid,
      isAdmin: false,
      isAnonymous: user.isAnonymous,
      creationTime: new Date(user.metadata.creationTime),
      provider: 'anonymous',
    };
    return anonUser;
  }
}
