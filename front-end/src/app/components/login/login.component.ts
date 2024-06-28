import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ionLockClosedOutline, ionLogoFacebook, ionLogoGithub, ionLogoGoogle, ionPersonOutline } from '@ng-icons/ionicons';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../../models/User';
import { Update } from '../../store/user/user.actions';

@Component({
  selector: 'app-login',
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

  ],
  providers: [provideIcons({
    ionPersonOutline, ionLockClosedOutline, ionLogoFacebook, ionLogoGoogle, ionLogoGithub
  }), MessageService, CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Input({ required: true }) toSignup!: Function;


  visible: boolean = false;
  signInForm: FormGroup<{ username: FormControl, password: FormControl }>;

  constructor(private fb: FormBuilder, private authService: AuthService, private messageService: MessageService, private cookieService: CookieService, private store: Store<User>) {
    this.signInForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.login(this.signInForm.value as { username: string, password: string }).subscribe(
      (res) => {
        this.cookieService.set('token', res.token, 1);
        this.store.dispatch(Update({ updateValue: res.user }));
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng nhập thành công' });
        this.visible = false;
      }
    );

  }


  toggleDialog() {
    this.visible = !this.visible;
  }

}
