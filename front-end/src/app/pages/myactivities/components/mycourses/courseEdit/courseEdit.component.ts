import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CourseFormComponent } from '../../../../../components/course-form/course-form.component';
import { Course } from '../../../../../models/Course';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import * as CourseManagerSelectors from '../../../../../store/mycoursemanager/mycoursemanager.selectors';
import { AppState } from '../../../../../store/reducer';
import { CourseManagerService } from '../../../../../services/course-manger.service';

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
  course: Observable<Course | null>
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private courseManager: Store<AppState>, private courseService: CourseManagerService) {
    let _id: String = this.activatedRoute.snapshot.paramMap.get('courseid') || '';
    this.course = this.courseManager.pipe(
      select(CourseManagerSelectors.selectCourseFromId(_id)),
      switchMap((course) => {
        if (course) {
          return of(course);
        }
        return courseService.getCourse(_id);
      }),
      tap(course => {
        if (course === null) {
          this.router.navigate(["/myactivities/mycourses"]);
        }
      })
    );
  }
}


