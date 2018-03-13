import { Observable } from 'rxjs/Observable';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { CustomValidators, ValidateEmailNotTaken } from '../login-form-component/validators';
import { FireAuthService } from '../../services/fire-auth-service.service';
import { FireDbService } from '../../services/fire-db.service';
import { User } from '../../interfaces/User';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('password') passwordInput;
  @ViewChild('password2') passwordConfirmInput;

  private registerForm: FormGroup;
  public passwordFormat = 'password';
  private phonePopUpVisible = false;
  public registerPromise: Q.Promise<{}>;
  public formSubmitted = false;

  constructor(
    public fb: FormBuilder,
    public authSvc: FireAuthService,
    public db: FireDbService) { }

  ngOnInit() {
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
        phone: ['', Validators.pattern('/\d{9}/')],
      }),
    });
    this.registerForm.setErrors({});
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

  showHidePhonePopUp() {
    this.phonePopUpVisible = !this.phonePopUpVisible;
  }

  public showHidePassword(input: HTMLInputElement) {
    input.type === 'password' ? input.type = 'text' : input.type = 'password';
  }

  public register() {
    this.formSubmitted = true;

    const user = new User();
    user.email = this.email.value;
    user.firstName = this.firstName.value;
    user.lastName = this.lastName.value;
    user.password = this.pw.value;
    if (this.phone.value) {
      user.phoneNumber = this.phone.value;
    }
    this.registerPromise = this.authSvc.registerWithEmail(user);
    this.registerPromise.then(response => {
      console.log(response);
    }, e => {
      console.error(e);
      this.registerForm.setErrors({
        emailTaken: {
          code: e.code,
          errorMsg: e.message
        }
      });
    });
  }

}
