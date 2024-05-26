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
  ],
  providers: [provideIcons({
    ionPersonOutline, ionLockClosedOutline, ionLogoFacebook, ionLogoGoogle, ionLogoGithub
  })],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  @Input({ required: true }) toSignup!: Function;

  visible: boolean = false;
  signInForm: FormGroup<{ username: FormControl, password: FormControl }>;

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.signInForm);

  }


  toggleDialog() {
    this.visible = !this.visible;
  }

}
