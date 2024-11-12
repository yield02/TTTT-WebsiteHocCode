import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { PostService } from "../../services/forum/post.service";
import { Router } from "@angular/router";
import { AdminPostService } from "../../services/admin/admin-post.service";
import { addPosts, deletePostSucess, manager_deletePosts, manager_loadPosts, manager_updateStatusPost, updateStatusPostSuccess } from "../../store/admin/post/post.actions";

@Injectable({ providedIn: 'root' })

export class AdminPostEffects {

    constructor(private actions$: Actions, private _adminPostService: AdminPostService) { }

    loadPost$ = createEffect(() => this.actions$.pipe(
        ofType(manager_loadPosts),
        switchMap((_action) =>
            this._adminPostService.getPosts()
                .pipe(
                    map(posts => addPosts({ posts: posts })),
                    catchError(error => of(error))
                )
        )
    ));

    updateStatus$ = createEffect(() => this.actions$.pipe(
        ofType(manager_updateStatusPost),
        switchMap((_action) =>
            this._adminPostService.updateStatus(_action.post_ids, _action.status, _action?.reason)
                .pipe(
                    map(() => updateStatusPostSuccess({ post_ids: _action.post_ids, status: _action.status, reason: _action?.reason })),
                    catchError(error => of(error)),
                )
        )
    ))


    deletePost$ = createEffect(() => this.actions$.pipe(
        ofType(manager_deletePosts),
        switchMap((_action) =>
            this._adminPostService.deletePosts(_action.ids).pipe(
                map(() => deletePostSucess({ ids: _action.ids })),
                catchError(error => of(error)),
            ),
        )
    ))


}