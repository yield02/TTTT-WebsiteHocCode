import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, take } from "rxjs";
import { TopicService } from "../../services/forum/topic.service";
import { addTopics, loadTopic } from "../../store/forum/topic/topic.actions";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class TopicEffects {

    constructor(private actions$: Actions, private _topicService: TopicService, private _messageSerive: MessageService) { }

    fetchTopics$ = createEffect(() => this.actions$.pipe(
        ofType(loadTopic),
        switchMap((_action) =>
            this._topicService.getAllTopic()
                .pipe(
                    map(topics => {
                        return addTopics({ topics: topics });
                    }),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ))


}