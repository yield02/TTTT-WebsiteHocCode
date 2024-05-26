import { AbstractControl, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export function comparePassword(password: string, repassword: string) {
    return function (control: AbstractControl): ValidationErrors | null {

        const value = control.parent?.value;


        // console.log(value?.[password], control.value, value?.[password] === control.value)

        if (value?.[password] == control.value) {
            return null;
        }

        return {
            comparePassword: 'Mật khẩu xác nhận không khớp',
        }
    }
}

