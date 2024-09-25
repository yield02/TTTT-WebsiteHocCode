import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCafeOutline, ionCalendarNumberOutline, ionHeartOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommentEditorComponent } from '../../components/comment-editor/comment-editor.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Post } from '../../../../models/forum/Post';
import { selectPostWithPostId } from '../../../../store/forum/post/post.selectors';
import { deletePost, loadPostWithId } from '../../../../store/forum/post/post.actions';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';

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
        ionCafeOutline,
        ionHeartOutline
    })],
    templateUrl: './forum-post-page.component.html',
    styleUrl: './forum-post-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostPageComponent {

    post$: Observable<Post | undefined>;
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

    ];;

    constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private _router: Router) {

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


}

