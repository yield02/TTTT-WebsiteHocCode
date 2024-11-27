import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCafeOutline, ionCalendarNumberOutline, ionHeartOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommentEditorComponent } from '../../components/comment-editor/comment-editor.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, from, map, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';
import { Post } from '../../../../models/forum/Post';
import { selectAuthorPostId, selectPostWithPostId } from '../../../../store/forum/post/post.selectors';
import { deletePost, interactWithPost, loadPostWithId, toggleBlockComment, toggleHiddenPost } from '../../../../store/forum/post/post.actions';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';

import { AuthUser, User } from '../../../../models/User';
import { selectUserFromId, selectUsersFromUsersId } from '../../../../store/users/users.selector';
import { FetchUsers } from '../../../../store/users/users.actions';
import { heroHeartSolid } from '@ng-icons/heroicons/solid';
import { createComment } from '../../../../store/forum/comment/comment.actions';

import vi from '@angular/common/locales/vi';
import { state } from '@angular/animations';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReportService } from '../../../../services/report.service';
import { ReportDynamicDialogComponent } from '../../../../components/report-dynamic-dialog/report-dynamic-dialog.component';
import { selectHashtagWithIds } from '../../../../store/forum/hashtag/hashtag.selectors';
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
        EditorComponent,


        CommentEditorComponent,
        CommentListComponent,
    ],
    providers: [DialogService, provideIcons({
        ionCalendarNumberOutline,
        heroHeartSolid,
        ionCafeOutline,
        ionHeartOutline
    })],
    templateUrl: './forum-post-page.component.html',
    styleUrl: './forum-post-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostPageComponent implements OnInit, OnChanges, OnDestroy {


    auth$: Observable<AuthUser> = this._store.select(state => state.user);

    post$: BehaviorSubject<Post> = new BehaviorSubject<Post>({
        _id: '',
        post_id: 0,
        topic: '',
        title: '',
        content: {},
        author_id: '',
        like: [],
        views: 0,
        status: 'waiting',
        hashtags: [],
        reason: '',
        createdAt: '',
        updatedAt: '',

    });

    hashtag: string = "";

    user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    initEditor: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        toolbar: false,
        editable_root: false,
        base_url: '/tinymce',
        suffix: '.min',
        resize: 'both',
        autoresize_on_init: true,
        plugins: ['image',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'codesample',
            'autoresize'
        ],
    }

    reportRef: DynamicDialogRef | undefined;

    actions: MenuItem[] = [

        {
            tooltipOptions: {
                tooltipLabel: 'Báo cáo bài viết'
            },
            icon: 'pi pi-flag',
            command: () => {
                this.showReportDialog();
            }
        },

    ];

    subscriptions: Subscription[] = [];



    constructor(
        private _store: Store<AppState>,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _reportService: ReportService,
        private _dialogService: DialogService,
        private _changeDetector: ChangeDetectorRef,
    ) {

    }
    ngOnInit(): void {

        const post_id = this._activatedRoute.snapshot.params['postId'];

        this.subscriptions.push(this._store.pipe(select(selectAuthorPostId(post_id)))
            .subscribe(
                user => {
                    if (user) {
                        this.user$.next(user);
                    }
                }
            ));


        this.subscriptions.push(this._activatedRoute.params.pipe(switchMap((params: any) => {
            return this._store.pipe(
                select(selectPostWithPostId(
                    params['postId'],
                )),
                map(post => {
                    if (!post) {
                        this._store.dispatch(loadPostWithId({
                            id: params['postId'],
                        }));
                    }
                    else {
                        this.post$.next(post);
                    }
                    return post?.author_id;
                }),
                switchMap((author) => {
                    if (author) {
                        this._store.dispatch(FetchUsers({ users_id: [author] }));
                        return this._store.pipe(select(selectUserFromId(author)));
                    }
                    return of(null);
                }))
        })).subscribe(
            author => {
                if (author) {
                    this.user$.next(author);
                }
            }
        ));


        // check user and post to add more action for post
        this.subscriptions.push(combineLatest({
            user: this._store.select(state => state.user),
            post: this._store.pipe(select(selectPostWithPostId(this._activatedRoute.snapshot.params['postId'])))
        }
        ).subscribe(data => {

            if (data.user._id == data.post?.author_id) {
                this.actions = [
                    {
                        tooltipOptions: {
                            tooltipLabel: 'Báo cáo bài viết'
                        },
                        icon: 'pi pi-flag',
                        command: () => {
                            this.showReportDialog();
                        }
                    },
                    {
                        tooltipOptions: {
                            tooltipLabel: 'Chỉnh sửa bài viết'
                        },
                        icon: 'pi pi-pencil',
                        command: () => {
                            this._router.navigate(['/forum', 'post', this._activatedRoute.snapshot.params['postId'], 'edit'])
                        }
                    }, {
                        tooltipOptions: {
                            tooltipLabel: 'Xóa bài viết'
                        },
                        icon: 'pi pi-trash',
                        command: () => {
                            this._store.dispatch(deletePost({ post_id: this._activatedRoute.snapshot.params['postId'] }))
                        }
                    },
                ]
                //check block comment
                if (data.post.manager?.block_comment) {
                    // this.actions = this.actions.filter(action => action.icon != 'pi pi-lock');
                    this.actions.push({
                        tooltipOptions: {
                            tooltipLabel: 'Mở khóa bình luận'
                        },
                        icon: 'pi pi-comments',
                        command: () => {
                            this._store.dispatch(toggleBlockComment({ post_id: this._activatedRoute.snapshot.params['postId'] }));
                        }
                    });
                }
                else {
                    this.actions.push({
                        tooltipOptions: {
                            tooltipLabel: 'Khóa bình luận'
                        },
                        icon: 'pi pi-lock',
                        command: () => {
                            this._store.dispatch(toggleBlockComment({ post_id: this._activatedRoute.snapshot.params['postId'] }));
                        }
                    });
                }

                //check hidden post
                if (data.post.manager?.hidden) {
                    this.actions.push({
                        tooltipOptions: {
                            tooltipLabel: 'Hiển thị bài viết'
                        },
                        icon: 'pi pi-eye',
                        command: () => {
                            this._store.dispatch(toggleHiddenPost({ post_id: this._activatedRoute.snapshot.params['postId'] }));
                        }
                    });
                }
                else {
                    this.actions.push({
                        tooltipOptions: {
                            tooltipLabel: 'Ẩn bài viết'
                        },
                        icon: 'pi pi-eye-slash',
                        command: () => {
                            this._store.dispatch(toggleHiddenPost({ post_id: this._activatedRoute.snapshot.params['postId'] }));
                        }
                    });
                }
            }

        }));


        this.subscriptions.push(
            from(this.post$).pipe(switchMap(post => {
                return this._store.pipe(select(selectHashtagWithIds(
                    post.hashtags)));
            })).subscribe(hashtag => {
                this.hashtag = hashtag;
                this._changeDetector.detectChanges();
            })
        )
    }

    ngOnChanges(
        change: SimpleChanges
    ): void {
        console.log(change);
    }

    showReportDialog() {

        this.reportRef = this._dialogService.open(ReportDynamicDialogComponent, {
            width: '500px',
            data: {
            }
        });

        this.reportRef?.onClose.subscribe((content) => {
            if (content) {
                this._reportService.report({
                    post_id: this.post$.getValue()._id,
                    content: content,
                    type_report: 'post',
                }).subscribe();
            }

        });
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

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

}

