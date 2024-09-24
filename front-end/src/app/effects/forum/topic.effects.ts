import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, take } from "rxjs";
import { TopicService } from "../../services/forum/topic.service";
import { addTopics, loadTopic } from "../../store/forum/topic/topic.actions";

@Injectable({ providedIn: 'root' })
export class TopicEffects {

    constructor(private actions$: Actions, private _topicService: TopicService) { }

    fetchTopics$ = createEffect(() => this.actions$.pipe(
        ofType(loadTopic),
        switchMap((_action) =>
            this._topicService.getAllTopic()
                .pipe(
                    map(topics => addTopics({ topics: topics })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ))


}