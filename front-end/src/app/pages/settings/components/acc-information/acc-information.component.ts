import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCameraOutline, ionMailOutline, ionPersonOutline, ionTransgenderOutline } from '@ng-icons/ionicons';
import { heroCake, heroDevicePhoneMobile, heroHome } from '@ng-icons/heroicons/outline';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { AvatarModule } from 'primeng/avatar';
import { Observable, Subscription } from 'rxjs';
import { AuthUser, User } from '../../../../models/User';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AuthService } from '../../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'setting-acc-information',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    NgIconComponent,
    ReactiveFormsModule,
    ButtonModule,
    RadioButtonModule,
    FileUploadModule,
    AvatarModule,
    HttpClientModule,
    InputSwitchModule,
    ToastModule,
  ],
  providers: [
    provideIcons({ ionPersonOutline, ionMailOutline, heroCake, heroHome, heroDevicePhoneMobile, ionTransgenderOutline, ionCameraOutline }),
    MessageService
  ],
  templateUrl: './acc-information.component.html',
  styleUrl: './acc-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccInformationComponent implements OnInit, OnDestroy {

  InformationForm: FormGroup;
  avatar?: {
    objectURL: string,
    lastModified: Number,
    lastModifiedDate: any;
    name: string,
    size: Number,
    type: String,
    webkitRelativePath: String,
    creationTime: any,
  } | undefined;

  fileAvatar?: File;

  user?: AuthUser;


  user$: Observable<AuthUser> = this._store.select(state => state.user);


  subscriptions: Subscription[] = [];
  constructor(private fb: FormBuilder, private _store: Store<AppState>, private _authService: AuthService, private _messageService: MessageService) {
    this.InformationForm = fb.group({
      fullname: ['', Validators.compose([Validators.required])],
      email: fb.group({
        data: ['', Validators.compose([Validators.required, Validators.email])],
        verify: [false],
        hidden: [false],
      }),
      phone: fb.group({
        data: ['', Validators.compose([Validators.required, Validators.pattern(/^(0|\+84)([35789]\d{8}|2\d{9})$/)])],
        verify: [false],
        hidden: [false],
      }),
      birthday: ['', Validators.compose([Validators.required])],
      gender: ['male', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.InformationForm.patchValue({
          fullname: user.fullname,
          email: {
            ...user.email,
            hidden: !user?.email?.hidden
          },
          phone: {
            ...user.phone,
            hidden: !user?.phone?.hidden
          },
          birthday: user?.birthday,
          gender: user.gender || 'male',
          address: user.address,
        });

        if (user.email?.verify == true) {
          this.InformationForm.get('email')?.get('data')?.disable();
        }
      }
    }))

  }


  choose(event: Event, callback: Function) {
    callback();
  }

  onSubmit() {
    console.log('onsumit');

    if (!this.InformationForm.valid) {
      this.InformationForm.markAllAsTouched();
      return;
    }

    const submitValue = {
      ...this.InformationForm.value,
      email: {
        ...this.InformationForm.value.email,
        hidden: !this.InformationForm.value.email.hidden
      },
      phone: {
        ...this.InformationForm.value.phone,
        hidden: !this.InformationForm.value.phone.hidden
      }
    }
    this.subscriptions.push(this._authService.updateInformation(submitValue).subscribe(data => {
      this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật thông tin thành công' });
    }, error => {
      if (error.status == 409) {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Email đã tồn tại' });
        this.InformationForm.get('email')?.get('data')?.setErrors({ emailExist: true });
      }
    }));
  }




  selectImage(event: any) {
    const file = event.files[0];
    this.avatar = file;
    this.fileAvatar = file;
  }

  uploadAvatar() {
    if (!this.avatar) {
      return;
    }
    let form = new FormData();
    form.append('avatar', this.fileAvatar!);
    this.subscriptions.push(this._authService.updateAvatar(form).subscribe((data: any) => {
      this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Tải ảnh đại diện thành công' });
      this._authService.updateAvatar(data.url);
    }, (error: any) => {
      console.log(error);
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Tải ảnh đại diện thất bại' });
    }));
  }

  cancelUploadAvatar() {
    this.avatar = undefined;
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
