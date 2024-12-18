import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { addPost, addPosts, createPost, deletePost, editContentPost, getAllPostOfAuthor, interactWithPost, loadPostWithId, removePost, toggleBlockComment, toggleHiddenPost, updatePost, updatePostView, updatePostViewSuccess } from "../../store/forum/post/post.actions";
import { PostService } from "../../services/forum/post.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })

export class PostEffects {

    constructor(
        private actions$: Actions,
        private _postService: PostService,
        private _router: Router,
        private _message: MessageService
    ) { }

    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(createPost),
        switchMap((_action) => {
            return this._postService.createPost(_action.post)
                .pipe(
                    map(post => {
                        this._message.add({ severity: 'success', summary: 'Đăng bài viết thành công', detail: "Vui lòng chờ người quản trị duyệt nhé!", key: "global" });
                        this._router.navigate(['/forum/post', post.post_id]);
                        return addPost({ post: post });
                    }),
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
                    map(post => {
                        this._message.add({ severity: 'success', detail: "Chỉnh sửa bài viết thành công.", key: "global" });
                        this._router.navigate(['/forum/post/' + post.post_id]);
                        return updatePost({ post: post });
                    }),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

    deletePost$ = createEffect(() => this.actions$.pipe(
        ofType(deletePost),
        switchMap((_action) =>
            this._postService.deletePost(_action.post_id)
                .pipe(
                    map(() => {
                        this._message.add({ severity: 'success', detail: "Xóa bài viết thành công.", key: "global" });
                        return removePost({ post_id: _action.post_id });
                    }),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

    interactPost$ = createEffect(() => this.actions$.pipe(
        ofType(interactWithPost),
        switchMap((_action) => this._postService.interactWithPost(_action.post)
            .pipe(
                map(post => updatePost({ post: post })),
                catchError(error => { console.log(error); return of() })
            ))
    ));

    toggleBlockComment$ = createEffect(() => this.actions$.pipe(
        ofType(toggleBlockComment),
        switchMap((_action) =>
            this._postService.toggleBlockComment(_action.post_id)
                .pipe(
                    map((post) => updatePost({ post })),
                    catchError(error => { console.log(error); return of() })))
    ));

    toggleHiddenPost$ = createEffect(() => this.actions$.pipe(
        ofType(toggleHiddenPost),
        switchMap((_action) =>
            this._postService.toggleHiddenPost(_action.post_id)
                .pipe(
                    map((post) => updatePost({ post })),
                    catchError(error => { console.log(error); return of() })))
    ));

    getAllPostOfAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(getAllPostOfAuthor),
        switchMap(() =>
            this._postService.getAllPostOfAuthor()
                .pipe(
                    map(posts => addPosts({ posts })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

    updateViewPost$ = createEffect(() => this.actions$.pipe(
        ofType(updatePostView),
        switchMap(_action => this._postService.updatePostView(_action._id).pipe(
            map(() => { return updatePostViewSuccess({ post_id: _action._id }) }),
            catchError(error => { console.log(error); return of() })
        )),
    ))

}