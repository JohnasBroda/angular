import { IAppState } from './../../app.states';
import { selector } from 'rxjs/operator/publish';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { MatSnackBar, MatSnackBarConfig, SimpleSnackBar, MatSnackBarRef } from '@angular/material';
import { IUser, User } from '@store/user/model';
import { Store } from '@ngrx/store';
import * as fromAuth from '@authState/index';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private user: User;
  public isReady = false;
  private userSub: Subscription;
  public queryParams: ParamMap;
  private snackBarref: MatSnackBarRef<SimpleSnackBar>;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    const snackBarDuration = 4000;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.store.select(fromAuth.selectUser).subscribe(user => this.user = user);
    this.route.queryParamMap.subscribe((response: ParamMap) => {
      this.queryParams = response;
      if (currentUser || this.user) {
        if (this.queryParams.has('isNewUser') && this.queryParams.get('isNewUser')) {
          const newUserSnackBarConfig: MatSnackBarConfig = {
            duration: snackBarDuration,
            verticalPosition: 'top',
            panelClass: ['alert', 'alert-success', 'text-success', 'border', 'border-succes', 'border-rounded', 'pt-2']
          };
          this.snackBarref = this.snackBar.open('You have successfully registered', 'action', newUserSnackBarConfig);
        } else if (this.queryParams.has('emailVerified') && this.queryParams.get('emailVerified') === 'true') {
          const newUserSnackBarConfig: MatSnackBarConfig = {
            duration: snackBarDuration,
            verticalPosition: 'top',
            panelClass: ['alert', 'alert-success', 'text-success', 'border', 'border-succes', 'border-rounded', 'pt-2']
          };
          this.snackBarref = this.snackBar.open('You have successfully activated your account', 'action', newUserSnackBarConfig);
        }
        setTimeout(() => {
          if (this.queryParams.has('emailVerified') && this.queryParams.get('emailVerified') === 'false') {
            const emailSnackBarConfig: MatSnackBarConfig = {
              duration: snackBarDuration,
              verticalPosition: 'top',
              panelClass: ['alert', 'alert-primary', 'text-primary']
            };
            this.snackBarref = this.snackBar.open('Please check your emails and verify your account!', 'action', emailSnackBarConfig);
          }
        }, snackBarDuration + 500);
        this.isReady = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  logout() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    this.store.dispatch(new fromAuth.Logout());
  }
}
