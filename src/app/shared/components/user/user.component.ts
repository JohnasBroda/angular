import { selector } from 'rxjs/operator/publish';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import {
  MatSnackBar,
  MatSnackBarConfig,
  SimpleSnackBar,
  MatSnackBarRef
} from '@angular/material';
import { Store } from '@ngrx/store';
import { User, Logout, selectUser } from '@store/auth';
import { IAppState } from '@store/app.states';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  public isReady = false;
  public queryParams: ParamMap;

  private user: User;
  private userSub: Subscription;
  private snackBarref: MatSnackBarRef<SimpleSnackBar>;

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private store: Store<IAppState>,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  public ngOnInit() {
    const snackBarDuration = 4000;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.store.select(selectUser).subscribe((user) => this.user = user);
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

  public ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  public logout() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    this.store.dispatch(new Logout());
  }
}
