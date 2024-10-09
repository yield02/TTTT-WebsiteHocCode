import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCafeOutline, ionCalendarNumberOutline, ionHeartOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommentEditorComponent } from '../../components/comment-editor/comment-editor.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { Post } from '../../../../models/forum/Post';
import { selectPostWithPostId } from '../../../../store/forum/post/post.selectors';
import { deletePost, interactWithPost, loadPostWithId } from '../../../../store/forum/post/post.actions';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';

import { AuthUser, User } from '../../../../models/User';
import { selectUserFromId, selectUsersFromUsersId } from '../../../../store/users/users.selector';
import { FetchUsers } from '../../../../store/users/users.actions';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { createComment } from '../../../../store/forum/comment/comment.actions';

import vi from '@angular/common/locales/vi';
registerLocaleData(vi);

@Component({
    selector: 'forum-post-page',
    standalone: true,
    imports: [
        CommonModule,
        AvatarModule,
        NgIconComponent,
        ButtonModule,
        RouterLink,
        SpeedDialModule,


        CommentEditorComponent,
        CommentListComponent,
    ],
    providers: [provideIcons({
        ionCalendarNumberOutline,
        heroHeartSolid,
        ionCafeOutline,
        ionHeartOutline
    })],
    templateUrl: './forum-post-page.component.html',
    styleUrl: './forum-post-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostPageComponent implements OnInit {


    auth$: Observable<AuthUser> = this._store.select(state => state.user);

    post$: BehaviorSubject<Post> = new BehaviorSubject<Post>({
        _id: '',
        post_id: 0,
        topic: '',
        title: '',
        content: {},
        author: '',
        like: [],
        views: 0,
        status: 'waiting',
        hashtags: [],
        reason: '',
        createdAt: '',
        updatedAt: '',

    });
    user$: BehaviorSubject<User> = new BehaviorSubject<User>({
        _id: '',
        user_id: 0,
        username: '',
        email: '',
        fullname: '',
        role: [],
        gender: false,
        phone: '',
        address: '',
        status: {},
        avatar: {
            url: '',
            contentType: '',
            buffer: '',
        },
        birthday: '',
    });


    actions: MenuItem[] = [
        {
            icon: 'pi pi-pencil',
            command: () => {
                this._router.navigate(['/forum', 'post', this._activatedRoute.snapshot.params['postId'], 'edit'])
            }
        },
        {
            icon: 'pi pi-trash',
            command: () => {
                this._store.dispatch(deletePost({ post_id: this._activatedRoute.snapshot.params['postId'] }))
            }
        },
        {
            icon: 'pi pi-flag',
            command: () => {
            }
        },

    ];

    constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private _router: Router) {

    }
    ngOnInit(): void {



        this._store.pipe(
            select(selectPostWithPostId(
                this._activatedRoute.snapshot.params['postId'],
            )),
            map(post => {
                if (!post) {
                    this._store.dispatch(loadPostWithId({
                        id: this._activatedRoute.snapshot.params['postId'],
                    }));
                }
                else {
                    this.post$.next(post);
                }
                return post?.author;
            }),
            switchMap((author) => {
                if (author) {
                    this._store.dispatch(FetchUsers({ users_id: [author] }));
                    return this._store.pipe(select(selectUserFromId(author)));
                }
                return of({});
            }),
            tap(user => {
                if (user) {
                    this.user$.next(user as User);
                }
            })

        ).subscribe();
    }


    formatUserTime(date: string): string {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            // console.error(`Invalid Date: ${date}`);
            return 'Invalid Date';
        }
        return formatDate(parsedDate, 'dd/MM/yyyy', 'vi');
    }

    formatTime(date: string): String {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            // console.error(`Invalid Date: ${date}`);
            return 'Invalid Date';
        }
        return formatDate(parsedDate, 'dd/MM/yyyy HH:mm', 'vi');
    }


    interactWithPost(post: Post) {
        this._store.dispatch(interactWithPost({ post: post }));
    }

    submitComment(comment: string, post_id: string) {
        this._store.dispatch(createComment({
            comment: {
                content: comment,
                post: post_id,
            }
        }))
    }

}

