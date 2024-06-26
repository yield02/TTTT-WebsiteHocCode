import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CourseFormComponent } from '../../../../../components/course-form/course-form.component';

@Component({
  selector: 'mycourses-course-edit',
  standalone: true,
  imports: [
    CommonModule,
    CourseFormComponent,
  ],
  templateUrl: './courseEdit.component.html',
  styleUrl: './courseEdit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseEditComponent { }
