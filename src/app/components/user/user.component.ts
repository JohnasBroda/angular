import { User } from './../../interfaces/User';
import { FireAuthService } from '../../services/fire-auth-service.service';
import { selector } from 'rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { OnDestroy, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { MatSnackBar, MatSnackBarConfig, SimpleSnackBar, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private user;
  private isReady = false;
  private userSub: Subscription;
  public queryParams: ParamMap;
  private snackBarref: MatSnackBarRef<SimpleSnackBar>;

  constructor(
    public authSvc: FireAuthService,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    const snackBarDuration = 4000;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser;
    this.route.queryParamMap.subscribe((response: ParamMap) => {
      this.queryParams = response;
      if (currentUser || !this.authSvc.currentUser) {
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
      } else { // in case of app reload
        this.userSub = this.authSvc.afAuth.authState.
          subscribe((user: firebase.User) => {
            this.user = this.authSvc.currentUser;
            this.isReady = true;
          }, error => {
            console.log(error.message);
          });
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
    this.authSvc.signOut();
  }
}
