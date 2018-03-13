import { FireAuthService } from './fire-auth-service.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { Route } from '@angular/router/src/config';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authSvc: FireAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authSvc.currentUser) {
      return true;
    } else {
      this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
