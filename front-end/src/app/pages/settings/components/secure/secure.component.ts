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


  constructor(private messageService: MessageService, private fb: FormBuilder) {
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
}
