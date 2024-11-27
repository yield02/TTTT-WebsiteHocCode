import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, } from "rxjs";
import { AddRatings, CreateRating, getRatingByCourseId } from "../store/rating/rating.action";
import { RatingService } from "../services/rating.service";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class RatingEffects {

    constructor(private actions$: Actions, private _ratingService: RatingService, private _message: MessageService) { }

    addRating$ = createEffect(() => this.actions$.pipe(
        ofType(CreateRating),
        switchMap((_action) => this._ratingService.createRating(_action.rating).pipe(
            map(rating => {
                this._message.add({ severity: 'success', summary: 'Thành công', detail: 'Đánh giá thành công, cám ơn bạn đã đánh giá.', key: 'global' });
                return AddRatings({ ratings: [rating] })
            }),
            catchError(error => {
                this._message.add({ severity: 'error', summary: 'Thất bại', detail: error.error.message, key: 'global' });
                return of(error)
            })
        ))
    ));

    loadRating$ = createEffect(() => this.actions$.pipe(
        ofType(getRatingByCourseId),
        switchMap((_action) => this._ratingService.getRatingByCourseId(_action.courseId).pipe(
            map(ratings => AddRatings({ ratings: ratings })),
            catchError(error => of(error))
        ))
    ));


}