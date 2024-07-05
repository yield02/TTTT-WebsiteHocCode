import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { Button, ButtonModule } from 'primeng/button';
import { Course } from '../../../../../models/Course';

@Component({
  selector: 'mycourses-course-item',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ButtonModule,
    RouterLink
  ],
  providers: [provideIcons({
    heroStarSolid
  })],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent {
  @Input() data!: Course;

}
