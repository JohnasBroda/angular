import { IAppState } from 'app/app.states';
import { EmailAuthService } from './../../services/email-auth.service';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { CustomValidators, ValidateEmailNotTaken } from '../login-form-component/validators';
import { FireDbService } from '../../services/fire-db.service';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { User } from '@store/user/model';
import { Store } from '@ngrx/store';
import * as fromAuth from '@authState/index';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('password') passwordInput;
  @ViewChild('password2') passwordConfirmInput;

  public registerForm: FormGroup;
  public passwordFormat = 'password';
  private phonePopUpVisible = false;
  public formSubmitted = false;
  public phoneNumberParts = ['country', 'area', 'prefix', 'line'];

  constructor(
    private emailAuth: EmailAuthService,
    public fb: FormBuilder,
    public db: FireDbService,
    private store: Store<IAppState>) { }

  ngOnInit() {
    this.buildForm();
  }

  get mandatory() {
    return this.registerForm.get('mandatory');
  }

  get firstName() {
    return this.mandatory.get('firstName');
  }

  get lastName() {
    return this.mandatory.get('lastName');
  }

  get email() {
    return this.mandatory.get('email');
  }

  get pw() {
    return this.mandatory.get('pw');
  }

  get pw2() {
    return this.mandatory.get('pw2');
  }

  get optional() {
    return this.registerForm.get('optional');
  }

  get phone() {
    return this.optional.get('phone');
  }

  private buildForm() {
    this.registerForm = this.fb.group({
      mandatory: this.fb.group({
        firstName: ['', [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.cannotContainSpace
        ]],
        lastName: ['', [
          Validators.required,
          Validators.minLength(3),
          CustomValidators.cannotContainSpace
        ]],
        email: ['', [
          Validators.required,
          Validators.minLength(3),
          Validators.email,
        ], [ValidateEmailNotTaken.createValidator(this.db)]
        ],
        pw: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          CustomValidators.cannotContainSpace,
          CustomValidators.shouldContainCapitalLetters
        ]],
        pw2: ['', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          CustomValidators.cannotContainSpace,
          CustomValidators.shouldContainCapitalLetters,
          CustomValidators.passwordConfirmShouldMatch(this.passwordInput),
        ]]
      }),
      optional: this.fb.group({
        phone: this.fb.group({
          country: this.validateMinMax(1, 2),
          area: this.validateMinMax(2, 3),
          prefix: this.validateMinMax(3, 3),
          line: this.validateMinMax(4, 4),
        })
      }),
    });
    this.registerForm.setErrors({});
  }

  public showHidePhonePopUp() {
    this.phonePopUpVisible = !this.phonePopUpVisible;
  }

  public showHidePassword(input: HTMLInputElement) {
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
  }

  public register() {
    this.formSubmitted = true;
    const user = new User(
      null,
      this.email.value,
      this.firstName.value + ' ' + this.lastName.value,
      'email',
      null,
      true,
      this.pw.value,
      this.phone.value ? this.e164 : null);
    this.store.dispatch(new fromAuth.RegisterEmail(user));
  }

  private validateMinMax(min, max) {
    return ['', [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')
    ]];
  }

  get e164() {
    const form = this.phone.value;
    const num = '' + form.country + form.area + form.prefix + form.line;
    return `+${num}`;
  }
}
