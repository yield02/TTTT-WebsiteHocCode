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

  ],
  providers: [provideIcons({
    ionPersonOutline, ionLockClosedOutline,
  })],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  @Input({ required: true }) toLogin!: Function;

  visible: boolean = false;
  signInForm: FormGroup<{ username: FormControl, password: FormControl, repassword: FormControl }>;
  test: boolean = false;

  constructor(private fb: FormBuilder) {
    this.signInForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repassword: ['', Validators.compose([Validators.required, Validators.minLength(6), comparePassword('password', 'repassword')])],
    },);
  }

  ngOnInit(): void {
    // console.log(this.signInForm);
  }

  onSubmit(): void {
    console.log(this.signInForm);

  }
  toggleDialog() {
    this.visible = !this.visible;
  }

}
