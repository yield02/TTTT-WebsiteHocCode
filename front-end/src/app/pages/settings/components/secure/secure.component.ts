import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCheckmark, ionCloseOutline } from '@ng-icons/ionicons';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { comparePassword } from '../../../../tools/Validator/comparePasswordValidation';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'setting-secure',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIconComponent,
    InputTextModule,
    DialogModule,
    FloatLabelModule,
    ToastModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule
  ],
  providers: [
    provideIcons({ ionCloseOutline, ionCheckmark }),
    MessageService
  ]
  ,
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecureComponent {
  isVerifiedEmail: boolean = false;
  isChangePassword: boolean = false;

  formChangePassword: FormGroup


  constructor(private messageService: MessageService, private fb: FormBuilder, private _authService: AuthService) {
    this.formChangePassword = this.fb.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      reNewPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), comparePassword('newPassword', 'reNewPassword')])],
    });
  }




  showVerifiedDialog(): void {
    this.isVerifiedEmail = true;
  }

  showChangePassword(): void {
    this.isChangePassword = true;
  }

  submitVerifiedEmail() {
    console.log(this.formChangePassword.value);
    this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: 'Mã xác thực không đúng!!!' });
  }

  submitChangePassword() {

    if (this.formChangePassword.invalid) {
      this.formChangePassword.markAllAsTouched();
      return;
    }

    console.log(this.formChangePassword.value);

    this._authService.changePassword(this.formChangePassword.value.oldPassword, this.formChangePassword.value.newPassword).subscribe(
      (data) => {

        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật mật khẩu thành công' });
        this.isChangePassword = false;
      },
      (error) => {
        if (error.status == 401) {
          this.formChangePassword.get('oldPassword')?.setErrors({ notValid: true });
        }
        console.log(error)
      }
    )



  }
}
