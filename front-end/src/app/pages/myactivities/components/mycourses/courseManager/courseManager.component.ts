import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { EnrollItemComponent } from './enroll-item/enroll-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RatingListComponent } from './rating-list/rating-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { map, Observable, tap } from 'rxjs';
import { Course } from '../../../../../models/Course';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { selectCourseFromCourseId } from '../../../../../store/courses/courses.selector';
import { ActivatedRoute } from '@angular/router';
import { FetchingCourseFromCourseId } from '../../../../../store/courses/courses.actions';
import { EnrollListComponent } from './enroll-list/enroll-list.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { selectCourseManagerFromId } from '../../../../../store/mycoursemanager/mycoursemanager.selectors';
import { FetchCourseManager } from '../../../../../store/mycoursemanager/mycoursemanager.actions';
@Component({
  selector: 'mycourses-course-manager',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    NgIconComponent,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PaginatorModule,


    WaitingListComponent,
    EnrollListComponent,
    EnrollItemComponent,
    RatingListComponent,
    CommentListComponent,
  ],
  providers: [provideIcons({ heroStarSolid })]
  ,
  templateUrl: './courseManager.component.html',
  styleUrl: './courseManager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseManagerComponent implements OnInit, OnChanges {
  isFetched: Boolean = false;



  course$!: Observable<Course | undefined>;

  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute) {

  }




  ngOnInit(): void {
    const course_id = this._activatedRoute.snapshot.params['courseId'];

    this.course$ = this._store.pipe(select(selectCourseManagerFromId(course_id)), tap(course => {
      // Fetching Course If course is unavailable
      if (!course && !this.isFetched) {
        this._store.dispatch(FetchCourseManager({ course_id: course_id }));
        this.isFetched = true;
      }
    }))

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }




}
