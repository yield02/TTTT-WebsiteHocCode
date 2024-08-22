import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommentComponent } from '../../../../../../components/comment/comment.component';
import { Paginator } from '../../../../../../models/Paginator';
import { PaginatorModule } from 'primeng/paginator';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/reducer';
import { ActivatedRoute } from '@angular/router';
import { selectDiscussFromCourseId } from '../../../../../../store/discuss/discuss.selectors';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { Discuss } from '../../../../../../models/Discuss';
import { DeleteDiscussByAuthorCourse, FetchingDiscussesFromCourseId } from '../../../../../../store/discuss/discuss.actions';
import { DeleteReplyDiscussByAuthorCourse } from '../../../../../../store/reply-discuss/reply-discuss.actions';
import { selectUsersAndFetchingUsers, selectUsersFromUsersId } from '../../../../../../store/users/users.selector';
import { FetchUsers } from '../../../../../../store/users/users.actions';

@Component({
  selector: 'course-manager-comment-list',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    PaginatorModule
  ],
  templateUrl: './commment-list.component.html',
  styleUrl: './comment-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit {
  paginator: Paginator;
  fetched: boolean = false;

  discusses$: BehaviorSubject<Discuss[]> = new BehaviorSubject<Discuss[]>([]);


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
      switchMap(discusses => {
        if (discusses.length <= 0 && !this.fetched) {
          this._store.dispatch(FetchingDiscussesFromCourseId({ course_id: courseId! }));
          this.fetched = true;
        }
        this.paginator.totalRecord = discusses.length;
        this.discusses$.next(discusses);
        if (discusses.length > 0) {
          let userList: String[] = discusses.map(discuss => discuss.author_id!) || [];
          return this._store.select(selectUsersAndFetchingUsers(userList));
        }
        return of();
      }),
      tap(data => {
        if (data.fetchUsers.length > 0) {
          this._store.dispatch(FetchUsers({ users_id: data.fetchUsers }))
        }
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
