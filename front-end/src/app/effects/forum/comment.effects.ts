import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HashtagService } from "../../services/forum/hashtag.service";
import { addHashtags, loadHashtag } from "../../store/forum/hashtag/hashtag.actions";
import { addComment, addComments, createComment, deleteComment, deleteCommentSuccess, getCommentsByPostId, getRepliesWithRepliesId, interactWithComment, interactWithCommentSuccess, updateContentComment, updateContentCommentSuccess } from "../../store/forum/comment/comment.actions";
import { CommentService } from "../../services/forum/comment.service";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class CommentEffects {

    constructor(
        private actions$: Actions,
        private _commentService: CommentService,
        private _messageService: MessageService
    ) { }



    createComment$ = createEffect(() => this.actions$.pipe(
        ofType(createComment),
        switchMap((_action) =>
            this._commentService.createComment(_action.comment, _action.reply_id).pipe(
                map(comment => {
                    this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã đăng bình luận thành công', key: "global" });
                    return addComment({ comment: comment, reply_id: _action?.reply_id });
                }),
                catchError(error => { console.log(error); return of() })
            )
        )
    ));

    fetchComment$ = createEffect(() => this.actions$.pipe(
        ofType(getCommentsByPostId),
        switchMap((_action) =>
            this._commentService.getCommentsByPostId(_action.post_id).pipe(
                map(data => addComments({ comments: data.data })),
                catchError(error => { console.log(error); return of() })
            ))));

    deleteComment$ = createEffect(() => this.actions$.pipe(
        ofType(deleteComment),
        switchMap(_action => this._commentService.deleteComment(_action.comment_id, _action.reply_id).pipe(
            map(comment => {
                this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã xóa bình luận thành công', key: "global" });
                return deleteCommentSuccess({ comment_id: _action.comment_id, reply_id: _action.reply_id });
            }),
            catchError(error => { console.log(error); return of() })
        ))
    ));

    editContentComment$ = createEffect(() => this.actions$.pipe(
        ofType(updateContentComment),
        switchMap((_action) =>
            this._commentService.editContentComment(_action.comment).pipe(
                map(comment => {
                    this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Bạn đã sửa bình luận thành công', key: "global" });
                    return updateContentCommentSuccess({ comment: comment });
                }),
                catchError(error => { console.log(error); return of() }))
        )
    ));

    interactWithComment$ = createEffect(() => this.actions$.pipe(
        ofType(interactWithComment),
        switchMap((_action) =>
            this._commentService.interactWithComment(_action.comment_id).pipe(
                map(comment => interactWithCommentSuccess({ comment: comment })),
                catchError(error => { console.log(error); return of() })
            ))
    ))


    getRepliesWithRepliesId$ = createEffect(() => this.actions$.pipe(
        ofType(getRepliesWithRepliesId),
        switchMap((_action) =>
            this._commentService.getRepliesWithRepliesId(_action.replies_id).pipe(
                map(data => addComments({ comments: data })),
                catchError(error => { console.log(error); return of() })
            ))
    ));

}