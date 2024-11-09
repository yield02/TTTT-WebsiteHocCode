import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { fetchLearnings } from '../../../../store/learning/learning.actions';
import { BehaviorSubject, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { selectCoursesFromCourseId } from '../../../../store/courses/courses.selector';
import { FetchingCourseFromCourseIds } from '../../../../store/courses/courses.actions';
import { CourseComponent } from '../../../../components/course/course.component';
import { Course } from '../../../../models/Course';
import { StudyHomeLearningItemComponent } from '../../../home/home/study-home-learning-item/study-home-learning-item.component';
import { LearningInterFace } from '../../../../models/Learning';

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
  learnings$!: Observable<{ [key: string]: LearningInterFace }>;




  constructor(private _store: Store<AppState>) {


  }

  ngOnInit(): void {


    this.learnings$ = this._store.select(state => state.learning).pipe(
      tap(learning => {
        if (!this.fetchLearning) {
          this._store.dispatch(fetchLearnings());
          this.fetchLearning = true;
        }
        let coursesIds = [];

        for (let [key, value] of Object.entries(learning)) {
          coursesIds.push(learning[key].course_id);
        }

        console.log(coursesIds);

        if (!this.fetchCourses && coursesIds.length > 0) {
          this._store.dispatch(FetchingCourseFromCourseIds({ course_ids: coursesIds }));
          this.fetchCourses = true;
        }

      })
    );
  }

  ngOnDestroy() {
  }

}
