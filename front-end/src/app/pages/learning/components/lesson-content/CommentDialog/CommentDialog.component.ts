import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommentComponent } from '../../../../../components/comment/comment.component';
import { ButtonModule } from 'primeng/button';
import { CommentEditorComponent } from '../../../../../components/comment-editor/comment-editor.component';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AppState } from '../../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { CreateDiscuss, DeleteDiscussByAuthor, FetchingDiscusses, UpdateContentDiscuss } from '../../../../../store/discuss/discuss.actions';
import { BehaviorSubject, Subscription, switchMap, tap } from 'rxjs';
import { Discuss } from '../../../../../models/Discuss';
import { selectDiscussFromLessonId } from '../../../../../store/discuss/discuss.selectors';
import { Observable } from 'rxjs';
import { AuthUser, User } from '../../../../../models/User';
import { selectUsersAndFetchingUsers } from '../../../../../store/users/users.selector';
import { FetchUsers } from '../../../../../store/users/users.actions';
import { DeleteReplyDiscuss } from '../../../../../store/reply-discuss/reply-discuss.actions';

@Component({
    selector: 'learning-lesson-comment-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,


        CommentEditorComponent,
        CommentComponent,

    ],
    templateUrl: `./commentDialog.component.html`,
    styleUrl: './CommentDialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentDialogComponent implements OnInit, OnDestroy {
    @ViewChild('commentBox') CommentBox!: ElementRef<HTMLDivElement>;

    fetched: boolean = false;


    totalComments: number = 0;
    maxLength: number = 10;
    discussList$ = new BehaviorSubject<Discuss[]>([]);
    user$: Observable<AuthUser> = this._store.select(state => state.user);


    selectDiscussSubscription: Subscription | undefined;

    constructor(private _dialogConfig: DynamicDialogConfig, private _store: Store<AppState>) {
    }

    ngOnInit() {
        this.selectDiscussSubscription = this._store.pipe(
            select(selectDiscussFromLessonId(this._dialogConfig.data.lesson_id)),
            tap((discusses => {
                if (discusses.length <= 0 && !this.fetched) {
                    this._store.dispatch(FetchingDiscusses({ lesson_id: this._dialogConfig.data.lesson_id }));
                    this.fetched = true;
                    return;
                }
                this.discussList$.next(discusses);
            }))
        ).subscribe();
    }

    submitComment(comment: String) {
        const lesson_id = this._dialogConfig.data.lesson_id;
        if (lesson_id) {
            this._store.dispatch(CreateDiscuss({ discuss: { content: comment, lesson_id: lesson_id } }));
        }
    }

    onDeleteDiscuss(discuss: Discuss) {
        this._store.dispatch(DeleteDiscussByAuthor({ discuss_id: discuss._id! }));
    }

    onReportDiscuss(discuss: Discuss) {
        console.log(discuss);

    }

    onEditDiscussion(discuss: Discuss) {
        this._store.dispatch(UpdateContentDiscuss({ discuss }));
    }

    onDeleteReply(data: { reply_id: String, discuss_id: String }) {
        this._store.dispatch(DeleteReplyDiscuss({ replyDiscussId: data.reply_id, discuss_id: data.discuss_id }));
    }

    loadMoreComment() {
        this.maxLength = this.maxLength + 10;
    }


    ngOnDestroy() {
        this.selectDiscussSubscription?.unsubscribe();
    }

}
