import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCafeOutline, ionCalendarNumberOutline } from '@ng-icons/ionicons';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { Comment } from '../../../../../models/forum/Comment';

import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthUser, User } from '../../../../../models/User';
import { selectUserFetch, selectUserFromId } from '../../../../../store/users/users.selector';
import { state } from '@angular/animations';
import { createComment, deleteComment, getRepliesWithRepliesId, interactWithComment, updateContentComment } from '../../../../../store/forum/comment/comment.actions';
import { CommentEditorComponent } from '../../comment-editor/comment-editor.component';
import { selectCommentsWithCommentsId } from '../../../../../store/forum/comment/comment.selectors';
import { FetchUsers } from '../../../../../store/users/users.actions';

import vi from '@angular/common/locales/vi';
registerLocaleData(vi);


@Component({
    selector: 'forum-comment',
    standalone: true,
    imports: [
        CommonModule,
        AvatarModule,
        NgIconComponent,
        ButtonModule,
        SpeedDialModule,
        CommentEditorComponent
    ],
    providers: [provideIcons({
        ionCalendarNumberOutline,
        ionCafeOutline
    })],
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {

    @Input() comment!: Comment;
    @Input() isReply: boolean = false;
    @Input() parentComment?: Comment;

    isReplying: boolean = false;
    loadReply: number = 0;

    author$!: Observable<User | undefined>;
    user$: Observable<AuthUser | undefined> = this._store.select(state => state.user);
    replies$?: BehaviorSubject<Comment[]> = new BehaviorSubject<Comment[]>([]);

    isEdit: boolean = false;


    moreActions!: MenuItem[] | null;
    constructor(private _store: Store<AppState>) {

    }

    ngOnInit(): void {

        if (this.isReply) {
            console.log(this.comment);
        }


        this.moreActions = [
            {
                icon: 'pi pi-flag',
            }
        ];

        this.author$ = this._store.pipe(select(selectUserFromId(this.comment.author_id!)));

        combineLatest({ user: this._store.select(state => state.user), author: this._store.pipe(select(selectUserFromId(this.comment.author_id!))) }).subscribe(data => {
            if (data.user._id === data.author?._id) {
                this.moreActions?.push(
                    {
                        icon: 'pi pi-pencil',
                        command: () => {
                            this.toggleEdit();
                        }
                    },
                    {
                        icon: 'pi pi-trash',
                        command: () => {
                            if (this.isReply) {

                                this._store.dispatch(deleteComment({ comment_id: this.comment._id!, reply_id: this.parentComment?._id }))
                            }
                            else {
                                this._store.dispatch(deleteComment({ comment_id: this.comment._id! }));
                            }
                        }
                    })
            }
        });

        this._store.pipe(
            select(selectCommentsWithCommentsId(this.comment.replies || [])),
            switchMap(replies => {
                if (replies.length > 0) {
                    this.replies$?.next(replies);
                    return this._store.pipe(select(selectUserFetch(replies.map(reply => reply.author_id as string))));
                }
                return of([]);
            }),
            tap(users_id => {
                if (users_id.length > 0) {
                    this._store.dispatch(FetchUsers({ users_id: users_id as String[] }));
                }
            })
        ).subscribe();
    }

    interactWithComment() {
        this._store.dispatch(interactWithComment({ comment_id: this.comment._id! }));
    }

    formatTime(date: string): string {
        return formatDate(new Date(date.toString()), 'dd/MM/yyyy', 'vi');
    }

    toggleEdit() {
        this.isEdit = !this.isEdit;
    }

    toggleReply() {
        this.isReplying = !this.isReplying;
    }

    loadReplies() {
        if (this.loadReply === 0) {
            this._store.dispatch(getRepliesWithRepliesId({ replies_id: this.comment.replies || [] }))
        }
        this.loadReply += 5;
    }

    createReplyComment(content: string) {
        this._store.dispatch(createComment({
            comment: {
                content: content,
                post: this.comment.post,
                isReply: true,
            },
            reply_id: this.comment._id!
        }));
    }

    submitEditComment(content: string) {
        if (content != this.comment.content) {
            this._store.dispatch(updateContentComment({
                comment: {
                    ...this.comment,
                    content: content,
                }
            }))
        }

        this.isEdit = false;
    }



} 
