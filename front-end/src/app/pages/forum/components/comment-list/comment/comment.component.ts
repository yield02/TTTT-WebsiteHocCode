import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCafeOutline, ionCalendarNumberOutline } from '@ng-icons/ionicons';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';
import { Comment } from '../../../../../models/forum/Comment';

import vi from '@angular/common/locales/vi';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { combineLatest, Observable, tap } from 'rxjs';
import { AuthUser, User } from '../../../../../models/User';
import { selectUserFromId } from '../../../../../store/users/users.selector';
import { state } from '@angular/animations';
import { deleteComment, interactWithComment, updateContentComment } from '../../../../../store/forum/comment/comment.actions';
import { CommentEditorComponent } from '../../comment-editor/comment-editor.component';
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


    author$!: Observable<User | undefined>;
    user$: Observable<AuthUser | undefined> = this._store.select(state => state.user);

    isEdit: boolean = false;


    moreActions!: MenuItem[] | null;
    constructor(private _store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.moreActions = [
            {
                icon: 'pi pi-flag',
            }
        ];

        this.author$ = this._store.pipe(select(selectUserFromId(this.comment.author!)));

        combineLatest({ user: this._store.select(state => state.user), author: this._store.pipe(select(selectUserFromId(this.comment.author!))) }).subscribe(data => {
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
                            this._store.dispatch(deleteComment({ comment_id: this.comment._id! }))
                        }
                    })
            }
        });
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
