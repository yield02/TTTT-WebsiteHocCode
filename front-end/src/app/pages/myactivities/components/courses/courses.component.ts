import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoursesComponent as AppCourses } from '../../../../components/courses/courses.component';

@Component({
  selector: 'myacc-courses',
  standalone: true,
  imports: [
    CommonModule,
    AppCourses
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent { }
