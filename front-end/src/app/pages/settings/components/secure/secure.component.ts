import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, NgZone, OnChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCheckmark, ionCheckmarkCircle, ionCloseOutline } from '@ng-icons/ionicons';
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
import { Observable, Observer, throttleTime } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { AuthUser } from '../../../../models/User';
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
    provideIcons({ ionCloseOutline, ionCheckmark, ionCheckmarkCircle }),
    MessageService
  ]
  ,
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecureComponent implements AfterViewInit, OnChanges {
  isVerifiedEmail: boolean = false;
  isUnverifiedEmail: boolean = false;

  isChangePassword: boolean = false;
  waitTimeVerify = 0;

  $user: Observable<AuthUser> = this._store.select(state => state.user);


  formChangePassword: FormGroup


  constructor(private _store: Store<AppState>, private messageService: MessageService, private fb: FormBuilder, private _authService: AuthService, private _ngZone: NgZone, private cdr: ChangeDetectorRef) {
    this.formChangePassword = this.fb.group({
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      reNewPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), comparePassword('newPassword', 'reNewPassword')])],
    });
  }
  ngOnChanges(): void {

  }

  ngAfterViewInit(): void {
    this._ngZone.runOutsideAngular(() => {
      setInterval(() => {
        if (this.waitTimeVerify > 0) {
          this.waitTimeVerify--;
          this.cdr.detectChanges(); // Manually trigger change detection
        }
      }, 1000)
    });
  }




  showVerifiedDialog(): void {
    this.isVerifiedEmail = true;
  }

  showUnverifiedDialog(): void {
    this.isUnverifiedEmail = true;
  }

  showChangePassword(): void {
    this.isChangePassword = true;
  }

  submitVerifiedEmail() {
    this.sendVerifyEmail();
  }

  submitUnverifiedEmail() {
    this.sendUnverifyEmail();
  }

  submitChangePassword() {

    if (this.formChangePassword.invalid) {
      this.formChangePassword.markAllAsTouched();
      return;
    }


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

  sendVerifyEmail() {
    this._authService.sendVerifyEmail().subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Gửi email xác thực thành công' });
      },
      (error) => {
        console.log(error)
      }
    )
    this.waitTimeVerify = 60;
  }

  sendUnverifyEmail() {
    this._authService.sendUnverifyEmail().subscribe(
      (data) => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Gửi email hủy xác thực thành công' });
      },
      (error) => {
        console.log(error)
      }
    )
    this.waitTimeVerify = 60;
  }
}
