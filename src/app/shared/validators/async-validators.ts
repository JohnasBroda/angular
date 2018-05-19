import { tap, map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { FireDbService } from '@services/db/fire-db.service';

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