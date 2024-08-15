import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AddReplyDiscuss, CreateReplyDiscuss, DeleteReplyDiscuss, DeleteReplyDiscussByAuthorCourse, DeleteReplyDiscussSucess, FetchReplyDiscuss, InteractReplyDiscuss, UpdateReplyDiscuss, UpdateReplyDiscussSucess } from "../store/reply-discuss/reply-discuss.actions";
import { map, of, switchMap, take, tap } from "rxjs";
import { ReplyDiscussService } from "../services/reply-discuss.service";
import { AddReplyDiscussToDiscuss, DeleteReplyDiscussFromDiscuss } from "../store/discuss/discuss.actions";


@Injectable({ providedIn: 'root' })
export class ReplyDiscussEffects {

    constructor(private actions$: Actions, private _replyDiscussService: ReplyDiscussService) { }


    $loadReplyDiscuss = createEffect(() =>
        this.actions$.pipe(
            ofType(FetchReplyDiscuss),
            switchMap(_action => this._replyDiscussService.FetchReplyDiscusses(_action.replyDiscucssesId).pipe(
                map(replyDiscusses => AddReplyDiscuss({ replyDiscucsses: replyDiscusses }))
            ))
        )
    );

    $createReplyDiscuss = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateReplyDiscuss),
            switchMap(_action => this._replyDiscussService.CreateReplyDiscuss(_action.replyDiscuss).pipe(
                map(replyDiscuss => AddReplyDiscuss({ replyDiscucsses: [replyDiscuss] })),
            )),
            switchMap(_action => {
                return [_action, AddReplyDiscussToDiscuss({ discuss_id: _action.replyDiscucsses[0].discuss_id!, replyDiscuss_id: _action.replyDiscucsses[0]._id! })];
            })
        )
    );

    $deleteReplyDiscuss = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteReplyDiscuss),
            switchMap(_action => this._replyDiscussService.DeleteReplyDiscuss(_action.replyDiscussId, _action.discuss_id).pipe(
                map(replyDiscuss => DeleteReplyDiscussSucess({ replyDiscussId: _action.replyDiscussId, discuss_id: _action.discuss_id })),
            )),
            switchMap(_action => {
                return [_action, DeleteReplyDiscussFromDiscuss({ discuss_id: _action.discuss_id!, replyDiscuss_id: _action.replyDiscussId })];
            })
        ));

    $deleteReplyDiscussByAuthorCourse = createEffect(() =>
        this.actions$.pipe(
            ofType(DeleteReplyDiscussByAuthorCourse),
            switchMap(_action => this._replyDiscussService.DeleteReplyDiscussByAuhtorCourse(_action.replyDiscussId, _action.discuss_id).pipe(
                map(replyDiscuss => DeleteReplyDiscussSucess({ replyDiscussId: _action.replyDiscussId, discuss_id: _action.discuss_id })),
            )),
            switchMap(_action => {
                return [_action, DeleteReplyDiscussFromDiscuss({ discuss_id: _action.discuss_id!, replyDiscuss_id: _action.replyDiscussId })];
            })
        ));

    $updateReplyDiscuss = createEffect(() => this.actions$.pipe(
        ofType(UpdateReplyDiscuss),
        switchMap(_action => this._replyDiscussService.UpdateReplyDiscuss(_action.replyDiscuss).pipe(
            map(replyDiscuss => UpdateReplyDiscussSucess({ replyDiscuss: replyDiscuss })),
        ))
    ));

    $interactReplyDiscuss = createEffect(() => this.actions$.pipe(
        ofType(InteractReplyDiscuss),
        switchMap(_action => this._replyDiscussService.InteractReplyDiscuss(_action.replyDiscussId).pipe(
            map(replyDiscuss => UpdateReplyDiscussSucess({ replyDiscuss: replyDiscuss })),
        ))
    ));

}