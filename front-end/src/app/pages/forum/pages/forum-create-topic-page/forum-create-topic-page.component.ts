import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { Post } from '../../../../models/forum/Post';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { createPost } from '../../../../store/forum/post/post.actions';
import { ActivatedRoute } from '@angular/router';

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
export class ForumCreateTopicPageComponent {



    constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute) {
    }


    submitPost(post: Post) {
        this._store.dispatch(createPost({
            post: {
                ...post,
                topic: this._activatedRoute.snapshot.params['topicId'],
            }
        }))
    }


}
