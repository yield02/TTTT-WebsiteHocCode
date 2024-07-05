import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { DialogModule } from 'primeng/dialog';
import { comparePassword } from '../../tools/Validator/comparePasswordValidation';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ionLockClosedOutline, ionPersonOutline } from '@ng-icons/ionicons';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ErrorMessageFormComponent } from '../error-message-form/error-message-form.component';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIconComponent,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ToastModule,
    PasswordModule,
    ErrorMessageFormComponent
  ],
  providers: [provideIcons({
    ionPersonOutline, ionLockClosedOutline,
  }), MessageService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  @Input({ required: true }) toLogin!: Function;


  errorMessage: String = '';
  visible: boolean = false;
  signInForm: FormGroup<{ username: FormControl, password: FormControl, repassword: FormControl }>;
  test: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService) {
    this.signInForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repassword: ['', Validators.compose([Validators.required, Validators.minLength(6), comparePassword('password', 'repassword')])],
    },);
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.authService.signup(this.signInForm.value as { username: string, password: string }).subscribe(
      res => {
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng ký thành công vui lòng chờ giây lát' });
        this.authService.login(this.signInForm.value as { username: string, password: string }).subscribe(
          res => {
            this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng nhập thành công' });
            this.toLogin();
          },
          err => {
            this.errorMessage = err.error.message;
            this.messageService.add({ severity: 'error', summary: 'Có lỗi xảy ra', detail: err.error.message });
          }
        );
      },
      err => {
        this.errorMessage = err.error.message;
        this.messageService.add({ severity: 'error', summary: 'Có lỗi xảy ra', detail: err.error.message });
      });
  }
  toggleDialog() {
    this.visible = !this.visible;
  }

}
