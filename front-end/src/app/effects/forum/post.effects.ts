import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { addPost, createPost, deletePost, editContentPost, loadPostWithId, removePost, updatePost } from "../../store/forum/post/post.actions";
import { PostService } from "../../services/forum/post.service";

@Injectable({ providedIn: 'root' })

export class PostEffects {

    constructor(private actions$: Actions, private _postService: PostService) { }

    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(createPost),
        switchMap((_action) => {
            return this._postService.createPost(_action.post)
                .pipe(
                    map(post => addPost({ post: post })),
                    catchError(error => { console.log(error); return of() })
                )
        }

        )
    ))

    loadPostWithId$ = createEffect(() => this.actions$.pipe(
        ofType(loadPostWithId),
        switchMap((_action) =>
            this._postService.getPostWithId(_action.id)
                .pipe(
                    map(post => addPost({ post: post })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

    editContentPost$ = createEffect(() => this.actions$.pipe(
        ofType(editContentPost),
        switchMap((_action) =>
            this._postService.editContentPost(_action.post)
                .pipe(
                    map(post => addPost({ post: post })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

    deletePost$ = createEffect(() => this.actions$.pipe(
        ofType(deletePost),
        switchMap((_action) =>
            this._postService.deletePost(_action.post_id)
                .pipe(
                    map(() => removePost({ post_id: _action.post_id })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

}