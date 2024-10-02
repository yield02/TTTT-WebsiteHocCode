import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { Post } from '../../../../models/forum/Post';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { selectPostWithPostId } from '../../../../store/forum/post/post.selectors';
import { editContentPost, loadPostWithId } from '../../../../store/forum/post/post.actions';

@Component({
    selector: 'forum-edit-post-page',
    standalone: true,
    imports: [
        CommonModule,
        PostFormComponent,
    ],
    templateUrl: './forum-edit-post-page.component.html',
    styleUrl: './forum-edit-post-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumEditPostPageComponent {
    post$: Observable<Post | undefined>;


    constructor(private _activatedRoute: ActivatedRoute, private _store: Store<AppState>) {
        this.post$ = this._store.pipe(select(selectPostWithPostId(
            this._activatedRoute.snapshot.params['postId'],
        )), tap(post => {
            if (!post) {
                this._store.dispatch(loadPostWithId({
                    id: this._activatedRoute.snapshot.params['postId'],
                }));
            }
        }));
    }



    submitEditPost(post: Post) {
        this._store.dispatch(editContentPost({ post }));
    }


}
