import { ParamMap } from '@angular/router/src/shared';
import { Component, OnInit, forwardRef } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  NG_ASYNC_VALIDATORS,
  FormGroup
} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  User,
  selectUser,
  LoginFacebook,
  LoginGoogle,
  LoginEmail
} from '@store/auth';

import { IAppState } from '@store/app.states';
import { CustomValidators } from '@shared/validators/validators';
import { EmailAuthService } from '@services/auth/email-auth.service';
import { FacebookAuthService } from '@services/auth/facebook-auth.service';
import { GoogleAuthService } from '@services/auth/google-auth.service';
import { AuthProvider } from '@services/auth/auth.service';

@Component({
  selector: 'app-login-form-component',
  templateUrl: './login-form-component.component.html',
  styleUrls: ['./login-form-component.component.css'],
})
export class LoginFormComponent implements OnInit {

  public form: FormGroup;
  public currentUser: Observable<User>;
  public loadingGoogleLogIn = false;
  public loadingFacebookLogIn = false;

  constructor(
    private emailAuth: EmailAuthService,
    private facebookAuth: FacebookAuthService,
    private googleAuth: GoogleAuthService,
    private store: Store<IAppState>,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.buildForm();
  }

  public ngOnInit() {
    this.currentUser = this.store.select(selectUser);
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.has('redirectTo')) {

      }
    });
  }

  public loginWithFacebook() {
    this.currentUser.subscribe((user: User) => this.loadingFacebookLogIn = user.loading);
    this.store.dispatch(new LoginFacebook({ provider: AuthProvider.facebook }));
  }

  public loginWithGoogle() {
    this.currentUser.subscribe((user: User) => this.loadingGoogleLogIn = user.loading);
    this.store.dispatch(new LoginGoogle({ provider: AuthProvider.google }));
  }

  public loginWithEmail() {
    const email = this.username.value;
    const password = this.password.value;
    const provider = AuthProvider.email;
    const payload = { email, password, provider };
    const event = new LoginEmail(payload);
    this.store.dispatch(event);
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  private buildForm() {
    this.form = this.fb.group({
      username: ['', [
        Validators.required,
        CustomValidators.cannotContainSpace
      ], [
        ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.cannotContainSpace,
        CustomValidators.shouldContainCapitalLetters
      ]]
    });
  }
}
