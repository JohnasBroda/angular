import { Component, OnInit, forwardRef } from '@angular/core';
import { FireAuthService } from '../../services/fire-auth-service.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms/src/model';
import { CustomValidators } from './validators';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login-form-component',
  templateUrl: './login-form-component.component.html',
  styleUrls: ['./login-form-component.component.css'],
})
export class LoginFormComponent implements OnInit {

  private form: FormGroup;

  constructor(
    public authSvc: FireAuthService,
    private router: Router,
    private fb: FormBuilder,
    public afAuth: AngularFireAuth, ) { }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  ngOnInit() {
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

  loginWithGoogle() {
    this.authSvc.signInWithGooglePopUp();
  }

  loginWithEmail() {
    this.authSvc.signInWithEmail(this.username.value, this.password.value)
    .catch(response => {
      const error = {
        invalidCredentials: response
      };
      this.form.setErrors(error);
    });
  }

}
