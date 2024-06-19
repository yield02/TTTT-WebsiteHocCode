import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
@Component({
  selector: 'mycourses-course-manager',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule
  ],
  templateUrl: './courseManager.component.html',
  styleUrl: './courseManager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseManagerComponent { }
