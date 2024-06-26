import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'course-manager-enroll-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    CheckboxModule,
  ],
  templateUrl: './enroll-item.component.html',
  styleUrl: './enroll-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollItemComponent { }
