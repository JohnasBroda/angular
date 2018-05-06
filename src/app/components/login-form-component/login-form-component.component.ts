import { User } from './../../core/store/user/model';
import { LoginGoogle } from './../../core/store/auth/actions';
import { IAppState } from './../../app.states';
import { FacebookAuthService } from './../../services/facebook-auth.service';
import { EmailAuthService } from './../../services/email-auth.service';
import { ParamMap } from '@angular/router/src/shared';
import { Component, OnInit, forwardRef } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { CustomValidators } from './validators';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { GoogleAuthService } from '../../services/google-auth.service';
import { IUser } from '@store/user/model';
import { Store } from '@ngrx/store';
import * as fromAuth from '@authState/index';
import { AuthProvider } from 'app/services/auth.service';
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

  ngOnInit() {
    this.currentUser = this.store.select(fromAuth.selectUser);
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      if (params.has('redirectTo')) {

      }
    });
  }

  loginWithFacebook() {
    this.currentUser.subscribe((user: User) => this.loadingFacebookLogIn = user.loading);
    this.store.dispatch(new fromAuth.LoginFacebook({ provider: AuthProvider.facebook }));
  }

  loginWithGoogle() {
    this.currentUser.subscribe((user: User) => this.loadingGoogleLogIn = user.loading);
    this.store.dispatch(new fromAuth.LoginGoogle({ provider: AuthProvider.google }));
  }

  loginWithEmail() {
    const email = this.username.value;
    const password = this.password.value;
    const provider = AuthProvider.email;
    const payload = { email, password, provider };
    const event = new fromAuth.LoginEmail(payload);
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
