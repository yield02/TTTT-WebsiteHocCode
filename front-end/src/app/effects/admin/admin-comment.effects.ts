import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { addComments, deleteCommentsSucess, manager_deleteComments, manager_loadComments, manager_updateStatusComments, updateStatusCommentsSuccess } from "../../store/admin/comment/comment.actions";
import { AdminCommentService } from "../../services/admin/admin-comment.service";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })

export class AdminCommentEffects {

    constructor(
        private actions$: Actions,
        private _adminCommentService: AdminCommentService,
        private _messageService: MessageService
    ) { }

    loadComment$ = createEffect(() => this.actions$.pipe(
        ofType(manager_loadComments),
        switchMap((_action) =>
            this._adminCommentService.getComments()
                .pipe(
                    map(comments => addComments({ comments: comments })),
                    catchError(error => of(error))
                )
        )
    ));

    updateStatus$ = createEffect(() => this.actions$.pipe(
        ofType(manager_updateStatusComments),
        switchMap((_action) =>
            this._adminCommentService.updateStatus(_action.comment_ids, _action.status, _action?.reason)
                .pipe(
                    map(() => {
                        this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật trạng thái bình luận thành công.', key: 'global' });
                        return updateStatusCommentsSuccess({ comment_ids: _action.comment_ids, status: _action.status, reason: _action?.reason });
                    }),
                    catchError(error => of(error)),
                )
        )
    ))


    deleteComment$ = createEffect(() => this.actions$.pipe(
        ofType(manager_deleteComments),
        switchMap((_action) =>
            this._adminCommentService.deleteComment(_action.ids).pipe(
                map(() => {
                    this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa bình luận thành công.', key: 'global' });
                    return deleteCommentsSucess({ ids: _action.ids });
                }),
                catchError(error => of(error)),
            ),
        )
    ));


}