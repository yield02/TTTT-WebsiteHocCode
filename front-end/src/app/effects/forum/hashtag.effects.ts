import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { HashtagService } from "../../services/forum/hashtag.service";
import { addHashtags, loadHashtag } from "../../store/forum/hashtag/hashtag.actions";

@Injectable({ providedIn: 'root' })
export class HashtagEffects {

    constructor(private actions$: Actions, private _hashtagService: HashtagService) { }

    fetchHashtag$ = createEffect(() => this.actions$.pipe(
        ofType(loadHashtag),
        switchMap((_action) =>
            this._hashtagService.getHashtags()
                .pipe(
                    map(hashtags => addHashtags({ hashtags: hashtags })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ))


}