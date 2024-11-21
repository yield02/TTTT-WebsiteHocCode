import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { Course } from '../../../models/Course';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { selectCourseFromCourseId } from '../../../store/courses/courses.selector';
import { FetchingCourseFromCourseId, UserEnrollCourse } from '../../../store/courses/courses.actions';
import { ChapterComponent } from './chapter/chapter.component';
import { Chapter } from '../../../models/Chapter';
import { selectChaptersFromCourseId } from '../../../store/chapters/chapters.selectors';
import { FetchingChapters } from '../../../store/chapters/chapters.actions';
import { AuthUser } from '../../../models/User';
import { selectRatingOfCourse } from '../../../store/rating/rating.selector';
import { getRatingByCourseId } from '../../../store/rating/rating.action';
import { selectUsersAndFetchingUsers } from '../../../store/users/users.selector';
import { FetchUsers } from '../../../store/users/users.actions';
import { RatingInterface } from '../../../models/Rating';
import { RatingItemComponent } from '../../myactivities/components/mycourses/courseManager/rating-item/rating-item.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ButtonModule,
    FormsModule,
    RatingModule,
    RouterLink,

    ChapterComponent,
    RatingItemComponent
  ],
  providers: [provideIcons({ ionDocumentTextOutline, bootstrapPersonVideo })],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit, OnDestroy {

  rating: number = 0;
  chapters$: BehaviorSubject<Chapter[]> = new BehaviorSubject<Chapter[]>([]);;
  course$: BehaviorSubject<Course | undefined> = new BehaviorSubject<Course | undefined>(undefined);
  user$: Observable<AuthUser> = this._store.select(state => state.user);
  ratings$: BehaviorSubject<RatingInterface[]> = new BehaviorSubject<RatingInterface[]>([]);


  was_enroll: boolean = false;
  isShowRating: boolean = false;
  isCollapseAll: boolean = true;
  fetchedCourse: boolean = false;
  fetchedChapters: boolean = false;
  isFetchRating: boolean = false;

  listenerRouteSubscription: Subscription | undefined;

  constructor(private _route: ActivatedRoute, private _store: Store<AppState>) {
  }

  ngOnInit(): void {


    this.listenerRouteSubscription = this._route.params.pipe(switchMap((params: any) => {
      this.isShowRating = false;
      this.isCollapseAll = true;
      this.fetchedCourse = false;
      this.fetchedChapters = false;
      this.isFetchRating = false;

      return combineLatest([
        this._store.pipe(select(selectCourseFromCourseId(params.courseId!))).pipe(tap(course => {
          if (!course && !this.fetchedCourse) {
            this._store.dispatch(FetchingCourseFromCourseId({ course_id: params.courseId! }));
          }
          if (course) {
            this.course$.next(course);
          }
        })),

        this._store.pipe(select(selectChaptersFromCourseId(params.courseId!))).pipe(tap(chapters => {
          if (chapters.length <= 0 && !this.fetchedChapters) {
            this._store.dispatch(FetchingChapters({ course_id: params.courseId! }));
            this.fetchedChapters = true;
          }
          this.chapters$.next(chapters);
        })),

        this._store.select((selectRatingOfCourse(params.courseId!))).pipe(
          switchMap((ratings) => {
            if (ratings.length <= 0 && !this.isFetchRating) {
              this._store.dispatch(getRatingByCourseId({ courseId: params.courseId! }));
              this.isFetchRating = true;
            }
            this.ratings$.next(ratings);
            if (ratings.length > 0) {
              let userList = ratings.map(rating => rating.author_id?._id!) || [];
              return this._store.select(selectUsersAndFetchingUsers(userList));
            }
            return of();
          }),
          tap((data) => {
            if (data.fetchUsers && data.fetchUsers.length > 0) {
              this._store.dispatch(FetchUsers({ users_id: data.fetchUsers }));
            }
          })
        )
      ]);
    })).subscribe();
  }

  toggleRating(): void {
    this.isShowRating = !this.isShowRating;
  }

  toggleCollapseAll(): void {
    this.isCollapseAll = !this.isCollapseAll;
  }


  enroll(course_id: String) {
    this._store.dispatch(UserEnrollCourse({ course_id: course_id }));
    this.was_enroll = true;
  }

  ngOnDestroy(): void {
    this.listenerRouteSubscription?.unsubscribe();
  }
}
