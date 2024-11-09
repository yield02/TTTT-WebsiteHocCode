import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { select, Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AppState } from '../../../../store/reducer';
import { getAllPostOfAuthor } from '../../../../store/forum/post/post.actions';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { Post } from '../../../../models/forum/Post';
import { selectPostsOfAuthor } from '../../../../store/forum/post/post.selectors';
import { AppMyacMypostPostItemComponent } from './app-myac-mypost-post-item/app-myac-mypost-post-item.component';
import { loadTopic } from '../../../../store/forum/topic/topic.actions';
import { PaginatorModule } from 'primeng/paginator';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
  total: number;
}

@Component({
  selector: 'myac-mypost',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconComponent,
    OverlayPanelModule,
    DropdownModule,
    PaginatorModule,

    AppMyacMypostPostItemComponent,
  ],
  providers: [provideIcons({
    ionSearchOutline,
    ionFilterOutline
  })],
  templateUrl: './mypost.component.html',
  styleUrl: './mypost.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MypostComponent implements OnInit, OnDestroy {


  isSearching = false;

  posts: Post[] = [];
  paginator: PageEvent = {
    first: 0,
    rows: 10,
    page: 0,
    pageCount: 0,
    total: 0
  }

  searchBehavior$: BehaviorSubject<{ search: string, subject: string, filter: { type: 'asc' | 'desc', field: any } }> = new BehaviorSubject<{ search: string, subject: string, filter: { type: 'asc' | 'desc', field: any } }>({
    search: '',
    subject: 'all',
    filter: {
      type: 'desc',
      field: ['like.length', 'view', 'createdAt', 'status']
    }
  });


  searchPost: FormControl = new FormControl('');


  constructor(private _store: Store<AppState>, private _changeDetector: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this._store.dispatch(loadTopic());
    this._store.dispatch(getAllPostOfAuthor());

    this.searchBehavior$.pipe(switchMap(
      filter => {
        return this._store.pipe(select(selectPostsOfAuthor(filter)));
      }
    )).subscribe(
      posts => {
        this.posts = posts;
        this.paginator.total = posts.length;
        this.paginator.pageCount = Math.ceil(posts.length / this.paginator.rows);
        this._changeDetector.detectChanges();
      }
    );

    this.searchPost.valueChanges.pipe(debounceTime(500)).subscribe(
      value => {
        this.searchBehavior$.next({
          ...this.searchBehavior$.getValue(),
          search: value
        });
      }
    );

  }

  toggleSearching() {
    this.isSearching = !this.isSearching;
  }

  fieldFilterChange(event: any) {
    this.searchBehavior$.next({
      ...this.searchBehavior$.getValue(),
      filter: {
        ...this.searchBehavior$.getValue().filter,
        field: event.value
      }
    });
  }
  typeFilterChange(event: any) {
    this.searchBehavior$.next({
      ...this.searchBehavior$.getValue(),
      filter: {
        ...this.searchBehavior$.getValue().filter,
        type: event.value
      }
    });
  }

  onPageChange(event: any) {
    this.paginator = {
      ...this.paginator,
      page: event.page,
      first: event.first,
      pageCount: event.pageCount,
    }
  }

  ngOnDestroy(): void {
    this.searchBehavior$.unsubscribe();
  }
}
