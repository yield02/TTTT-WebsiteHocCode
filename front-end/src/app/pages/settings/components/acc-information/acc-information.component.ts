import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

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
    HttpClientModule
  ],
  providers: [provideIcons({ ionPersonOutline, ionMailOutline, heroCake, heroHome, heroDevicePhoneMobile, ionTransgenderOutline, ionCameraOutline })],
  templateUrl: './acc-information.component.html',
  styleUrl: './acc-information.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccInformationComponent {

  InformationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.InformationForm = fb.group({
      fullname: [''],
      email: [''],
      phone: [''],
      birthday: [''],
      gender: [''],
      address: [''],
    });
  }

  choose(event: Event, callback: Function) {
    callback();
  }

  onSubmit() {
    console.log(this.InformationForm.value);
  }

  onBasicUploadAuto(event: any) {
    console.log(event.files);
  }
}
