import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { Post } from '../../../../models/forum/Post';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { createPost } from '../../../../store/forum/post/post.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { AuthUser } from '../../../../models/User';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-forum-create-topic-page',
    standalone: true,
    imports: [
        CommonModule,
        PostFormComponent,
    ],
    templateUrl: './forum-create-topic-page.component.html',
    styleUrl: './forum-create-topic-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumCreateTopicPageComponent implements OnInit, OnDestroy {


    auth$!: Subscription;

    constructor(
        private _store: Store<AppState>,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _messageService: MessageService
    ) {
    }

    ngOnInit() {
        this.auth$ = this._store.select(state => state.user).pipe(tap((user) => {
            if (user.email?.verify === false || !user.phone?.data || !user.fullname) {
                this._messageService.add({
                    severity: 'error',
                    summary: 'Có lỗi xảy ra',
                    detail: 'Bạn phải xác thực đầy đủ thông tin để đăng bài.',
                    key: "global"
                });
                this._router.navigate(['/forum']);
            }
        })).subscribe();
    }


    submitPost(post: Post) {
        this._store.dispatch(createPost({
            post: {
                ...post,
                topic: this._activatedRoute.snapshot.params['topicId'],
            }
        }))
    }

    ngOnDestroy() {
        // Unsubscribe to avoid memory leaks
        this.auth$.unsubscribe();
    }

}
