import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CourseFormComponent } from '../../../../../components/course-form/course-form.component';
import { Course } from '../../../../../models/Course';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import * as CourseManagerSelectors from '../../../../../store/mycoursemanager/mycoursemanager.selectors';
import { AppState } from '../../../../../store/reducer';

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
export class CourseEditComponent {
  course: Observable<Course | undefined>
  constructor(private router: ActivatedRoute, private courseManager: Store<AppState>) {
    let _id: String = this.router.snapshot.paramMap.get('courseid') || '';
    this.course = this.courseManager.pipe(select(CourseManagerSelectors.selectCourseFromId(_id)));
  }
}
