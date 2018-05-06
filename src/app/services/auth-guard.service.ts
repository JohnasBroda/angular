import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Route } from '@angular/router/src/config';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Router } from '@angular/router';
import { IAppState } from 'app/app.states';
import { select, Store } from '@ngrx/store';
import { User } from '@store/user/model';
import * as fromAuth from '@authState/index';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  private currentUser: Observable<User>;

  constructor(private router: Router, private store: Store<IAppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let canActivate;
    this.currentUser = this.store.pipe(select(fromAuth.selectUser));
    this.currentUser.subscribe(user => {
      if (user) {
        canActivate = true;
      } else {
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        canActivate = false;
      }
    });
    return canActivate;
  }
}
