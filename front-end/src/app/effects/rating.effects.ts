import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, } from "rxjs";
import { AddRatings, CreateRating, getRatingByCourseId } from "../store/rating/rating.action";
import { RatingService } from "../services/rating.service";

@Injectable({ providedIn: 'root' })
export class RatingEffects {

    constructor(private actions$: Actions, private _ratingService: RatingService) { }

    addRating$ = createEffect(() => this.actions$.pipe(
        ofType(CreateRating),
        switchMap((_action) => this._ratingService.createRating(_action.rating).pipe(
            map(rating => AddRatings({ ratings: [rating] })),
            catchError(error => of(error))
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