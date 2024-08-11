import { AbstractControl, ValidationErrors } from "@angular/forms";

export function usernameValidation(control: AbstractControl): ValidationErrors | null {

    const value = control.value as string;

    if (!isValidString(value)) {
        return {
            'username': 'Tên đăng nhập không chứa ký tự đặt biệt',
        }
    }
    return null;
}

function isValidString(str: string): boolean {

    if (!str) {
        return true;
    }

    if (str.includes(" ")) {
        return false;
    }

    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(str);
}