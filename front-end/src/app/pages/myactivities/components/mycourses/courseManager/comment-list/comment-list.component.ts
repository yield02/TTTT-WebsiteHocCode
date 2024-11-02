import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommentComponent } from '../../../../../../components/comment/comment.component';
import { Paginator } from '../../../../../../models/Paginator';
import { PaginatorModule } from 'primeng/paginator';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/reducer';
import { ActivatedRoute } from '@angular/router';
import { selectDiscussFromCourseId } from '../../../../../../store/discuss/discuss.selectors';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { Discuss } from '../../../../../../models/Discuss';
import { DeleteDiscussByAuthorCourse, FetchingDiscussesFromCourseId } from '../../../../../../store/discuss/discuss.actions';
import { DeleteReplyDiscussByAuthorCourse } from '../../../../../../store/reply-discuss/reply-discuss.actions';
import { selectUsersAndFetchingUsers, selectUsersFromUsersId } from '../../../../../../store/users/users.selector';
import { FetchUsers } from '../../../../../../store/users/users.actions';
import { FetchingLessonsByCourseId } from '../../../../../../store/lessons/lessons.actions';
import { DropdownModule } from 'primeng/dropdown';
import { Lesson } from '../../../../../../models/Lesson';
import { selectLessonFromCourseId } from '../../../../../../store/lessons/lessons.selectors';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { AuthUser } from '../../../../../../models/User';

@Component({
  selector: 'course-manager-comment-list',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    PaginatorModule,
    DropdownModule,
    ReactiveFormsModule,
  ],
  templateUrl: './commment-list.component.html',
  styleUrl: './comment-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  paginator: Paginator;
  fetched: boolean = false;

  filterValue: FormControl = new FormControl('all');

  discusses$: BehaviorSubject<Discuss[]> = new BehaviorSubject<Discuss[]>([]);

  lessons$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  user$: Observable<AuthUser> = this._store.select(state => state.user);

  isFetchLesson: boolean = false;

  constructor(private _store: Store<AppState>, private _route: ActivatedRoute) {
    this.paginator = {
      pageIndex: 0,
      pageSize: 10,
      totalRecord: 10,
    }
  }

  ngOnInit(): void {
    const courseId = this._route.snapshot.paramMap.get('courseId');

    this._store.select(selectDiscussFromCourseId(courseId!)).pipe(
      tap(discusses => {
        if (discusses.length <= 0 && !this.fetched) {
          this._store.dispatch(FetchingDiscussesFromCourseId({ course_id: courseId! }));
          this.fetched = true;
        }
        this.paginator.totalRecord = discusses.length;
        this.discusses$.next(discusses);
      })
    ).subscribe();

    if (!this.isFetchLesson) {
      this._store.dispatch(FetchingLessonsByCourseId({ course_id: courseId! }));
      this.isFetchLesson = true;
    }

    this._store.pipe(select(selectLessonFromCourseId(courseId as string))).subscribe(lessons => {
      this.lessons$.next([{ _id: 'all', title: 'Tất cả' }, ...lessons]);
    });

    this.filterValue.valueChanges.pipe(tap(lesson_id => {
      this._store.dispatch(FetchingDiscussesFromCourseId({ course_id: courseId!, lesson_id }));
    })).subscribe();

    this._store.select(selectDiscussFromCourseId(courseId!)).pipe(
      tap(discusses => {
        this.paginator.totalRecord = discusses.length;
        this.discusses$.next(discusses || []);
      })
    ).subscribe();

  }

  onDeleteDiscussByAdmin(discuss: Discuss) {
    this._store.dispatch(DeleteDiscussByAuthorCourse({ discuss_id: discuss._id! }));
  }

  onDeleteReplyByAdmin(data: { reply_id: String, discuss_id: String }) {
    this._store.dispatch(DeleteReplyDiscussByAuthorCourse({ replyDiscussId: data.reply_id, discuss_id: data.discuss_id }));
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.first;
    this.paginator.pageSize = event.rows;
  }


}
