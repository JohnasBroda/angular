import { FireDbService } from './../../services/fire-db.service';
import { ValidationErrors, ValidatorFn } from '@angular/forms/src/directives/validators';
import { AbstractControl } from '@angular/forms/src/model';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { AsyncValidatorFn } from '@angular/forms';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export class CustomValidators {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') >= 0) {
            return {
                cannotContainSpace: {
                    errorMsg: 'field can not contain spaces!'
                }
            };
        }
        return null;
    }

    static shouldContainCapitalLetters(control: AbstractControl): ValidationErrors | null {
        if (!(new RegExp(/\w*[A-Z]\w*/).test(control.value))) {
            return {
                shouldContainCapitalLetters: {
                    errorMsg: 'field should contain at least 1 capital letter!'
                }
            };
        }
        return null;
    }

    static passwordConfirmShouldMatch(passwordInput: ElementRef): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value !== passwordInput.nativeElement.value) {
                return {
                    passwordconfirm: {
                        errorMsg: 'Password confirmation have to match the provided password'
                    }
                };
            }
            return null;
        };
    }

    static mustBeNumberValidator(control: AbstractControl): ValidationErrors | null {
        return control.value instanceof Number ? null : { mustBeNumber: { errorMsg: 'Field must take only numbers as values', } };
    }
}

export class ValidateEmailNotTaken {
    static createValidator(db: FireDbService) {
        return (control: AbstractControl) => {
            return db.checkEmailNotTaken(control.value).pipe(
                tap(x => console.log(x)),
                map(res => {
                    if (!res) {
                        console.log(res);
                        return { emailTaken: { errorMsg: 'This email is already in use', } };
                    } else { return null; }
                }),
            );
        };
    }
}

export function existingMobileNumberValidator(fireDbService: FireDbService): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return fireDbService.getUserByMobileNumber(control.value).map(users => {
          console.log(users);
          return (users && users.length > 0) ? {'mobNumExists': true} : null;
        }
      );
    };
  }
