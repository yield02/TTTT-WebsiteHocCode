import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { fetchLearnings } from '../../../../store/learning/learning.actions';
import { BehaviorSubject, map, Subscription, switchMap, tap } from 'rxjs';
import { selectCoursesFromCourseId } from '../../../../store/courses/courses.selector';
import { FetchingCourseFromCourseIds } from '../../../../store/courses/courses.actions';
import { CourseComponent } from '../../../../components/course/course.component';
import { Course } from '../../../../models/Course';
import { StudyHomeLearningItemComponent } from '../../../home/home/study-home-learning-item/study-home-learning-item.component';

@Component({
  selector: 'myacc-courses',
  standalone: true,
  imports: [
    CommonModule,
    CourseComponent,
    StudyHomeLearningItemComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit, OnDestroy {



  fetchLearning: boolean = false;
  fetchCourses: boolean = false;
  coursesIds: String[] = [];
  courses$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);


  selectLearningSubscription: Subscription | undefined;

  constructor(private _store: Store<AppState>) {


  }

  ngOnInit(): void {


    this.selectLearningSubscription = this._store.select(state => state.learning).pipe(
      map(learning => {
        if (Object.keys(learning).length <= 0 && !this.fetchLearning) {
          this._store.dispatch(fetchLearnings());
          this.fetchLearning = true;
          return;
        }
        return Object.keys(learning);
      }),
      switchMap(coursesId => {
        this.coursesIds = coursesId!;
        console.log(this.coursesIds);
        return this._store.pipe(select(selectCoursesFromCourseId(coursesId!)))
      }),
      tap(courses => {

        console.log(!courses?.length && !this.fetchCourses);

        if (!courses?.length && !this.fetchCourses && this.coursesIds?.length > 0) {
          console.log(this.coursesIds);
          this._store.dispatch(FetchingCourseFromCourseIds({ course_ids: this.coursesIds! }));
          this.fetchCourses = true;
          return;
        }
        this.courses$.next(courses!);
        console.log(courses);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.selectLearningSubscription?.unsubscribe();
  }

}
