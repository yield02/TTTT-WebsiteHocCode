import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CommentComponent } from './comment/comment.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of, Subscription, switchMap, tap } from 'rxjs';
import { CommentService } from '../../../../services/forum/comment.service';
import { Comment } from '../../../../models/forum/Comment';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { FetchUsers } from '../../../../store/users/users.actions';
import { selectUserFetch } from '../../../../store/users/users.selector';
import { getCommentsByPostId } from '../../../../store/forum/comment/comment.actions';
import { selectCommentsWithPostId } from '../../../../store/forum/comment/comment.selectors';


interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}

@Component({
    selector: 'forum-comment-list',
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule,
        DropdownModule,
        FormsModule,

        CommentComponent
    ],
    templateUrl: './comment-list.component.html',
    styleUrl: './comment-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent implements OnInit, OnDestroy {

    private subs: Subscription[] = [];

    comments$: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);
    fetchedComment: boolean = false;


    filter: { page: number, sortTime: 'asc' | 'desc' } = {
        page: 1,
        sortTime: 'desc'
    }

    filterChoice: {
        name: string;
        code: string;
    }[] | undefined;

    paginator: PageEvent = {
        first: 0,
        rows: 10,
        page: 1,
        pageCount: 10,
        total: 0
    };

    constructor(private _activatedRoute: ActivatedRoute, private _commentService: CommentService, private _store: Store<AppState>, private ref: ChangeDetectorRef) {
        this.filterChoice = [
            {
                name: 'mới nhất',
                code: 'desc'
            },
            {
                name: 'cũ nhất',
                code: 'asc'
            }
        ];

        this._activatedRoute.snapshot.params['postId'];
    }


    ngOnInit(): void {
        this.fetchComment();
    }

    fetchComment() {



        this._store.pipe(select(selectCommentsWithPostId(this._activatedRoute.snapshot.params['postId'], this.filter))).pipe(
            switchMap((data: { comments: Comment[], totalComments: number }) => {
                if (data.comments.length <= 0 && !this.fetchedComment) {
                    this._store.dispatch(getCommentsByPostId({ post_id: this._activatedRoute.snapshot.params['postId'] }));
                    this.fetchedComment = true;
                    return of([]);
                }
                this.paginator.total = data.totalComments;
                this.comments$.next(data.comments);
                this.ref.detectChanges();

                let users_id = new Set(data.comments.map(item => item.author_id));
                return this._store.pipe(select(selectUserFetch([...users_id] as string[])))
            }), tap(users_id => {
                if (users_id.length > 0) {
                    this._store.dispatch(FetchUsers({ users_id: users_id as String[] }))
                }
            })

        ).subscribe();

    }

    filterComment(event: any) {
        this.filter.sortTime = event.value;
        this.fetchComment();
    }

    changePage(event: any) {
        this.filter.page = ++event.page;
        this.fetchComment();
    }


    ngOnDestroy(): void {
        this.subs.forEach(sub => sub.unsubscribe());
    }



}
