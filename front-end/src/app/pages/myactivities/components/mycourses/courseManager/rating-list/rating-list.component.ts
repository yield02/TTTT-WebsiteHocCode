import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RatingItemComponent } from '../rating-item/rating-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { Paginator } from '../../../../../../models/Paginator';
import { AppState } from '../../../../../../store/reducer';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { selectRatingOfCourse } from '../../../../../../store/rating/rating.selector';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { RatingInterface } from '../../../../../../models/Rating';
import { getRatingByCourseId } from '../../../../../../store/rating/rating.action';
import { selectUsersAndFetchingUsers } from '../../../../../../store/users/users.selector';
import { FetchUsers } from '../../../../../../store/users/users.actions';

@Component({
  selector: 'course-manager-rating-list',
  standalone: true,
  imports: [
    CommonModule,
    RatingItemComponent,
    PaginatorModule
  ],
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingListComponent implements OnInit {

  paginator: Paginator;

  ratings$: BehaviorSubject<RatingInterface[]> = new BehaviorSubject<RatingInterface[]>([]);
  isFetching: boolean = false;

  constructor(private _store: Store<AppState>, private _activeRoute: ActivatedRoute) {
    this.paginator = {
      pageIndex: 0,
      pageSize: 5,
      totalRecord: 10,
    }
  }

  ngOnInit(): void {
    const courseId = this._activeRoute.snapshot.paramMap.get('courseId');

    this._store.select((selectRatingOfCourse(courseId!))).pipe(
      switchMap((ratings) => {
        if (ratings.length <= 0 && !this.isFetching) {
          this._store.dispatch(getRatingByCourseId({ courseId: courseId! }));
          this.isFetching = true;
        }
        if (ratings.length > 0) {
          this.paginator.totalRecord = ratings.length;
          this.ratings$.next(ratings);
          let userList = ratings.map(rating => rating.author_id!) || [];
          return this._store.select(selectUsersAndFetchingUsers(userList));
        }
        return of();
      }),
      tap((data) => {
        if (data.fetchUsers && data.fetchUsers.length > 0) {
          this._store.dispatch(FetchUsers({ users_id: data.fetchUsers }));
        }
      })
    ).subscribe();



  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.first;
    this.paginator.pageSize = event.rows;
  }
}
