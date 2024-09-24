import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { addPost, createPost } from "../../store/forum/post/post.actions";
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


}