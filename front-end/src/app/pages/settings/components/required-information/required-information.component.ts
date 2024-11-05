import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { comparePassword } from '../../../../tools/Validator/comparePasswordValidation';
import { usernameValidation } from '../../../../tools/Validator/usernameValidation';
import { AuthService } from '../../../../services/auth.service';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { catchError, map, of, Subscription, tap } from 'rxjs';
import { Update } from '../../../../store/user/user.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'setting-required-information',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './required-information.component.html',
    styleUrl: './required-information.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequiredInformationComponent {

    requiredInformationForm: FormGroup;

    subscriptions: Subscription[] = [];

    constructor(private _fb: FormBuilder, private _authService: AuthService, private _store: Store<AppState>, private _router: Router) {
        this.requiredInformationForm = this._fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20), usernameValidation])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            repassword: ['', Validators.compose([Validators.required, comparePassword('password', 'repassword')])],
        })
    }

    onSubmit() {
        this.subscriptions.push(this._authService.updateRequiredInformation(this.requiredInformationForm.value.username, this.requiredInformationForm.value.password).pipe(
            tap(data => {
                this._store.dispatch(Update({ updateValue: data }));
                this._router.navigate(['/home']);
            }),
            catchError(error => {
                if (error.status == 409) {
                    this.requiredInformationForm.get('username')?.setErrors({ usernameExist: 'Tài khoản đã tồn tại' });
                }
                return of(error);
            })
        ).subscribe());
    }
}
