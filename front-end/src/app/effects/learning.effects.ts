import { Injectable, Type } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addAllLearning, addLearning, fetchLearning, fetchLearnings, updateAndCreateLearning, updateLearing } from "../store/learning/learning.actions";
import { LearningService } from "../services/learning.service";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class LearningEffects {

    constructor(private actions$: Actions, private _learningService: LearningService) { }

    // fetchUsers$ = createEffect(() => this.actions$.pipe(
    //     ofType(FetchUsers),
    //     switchMap((_action) =>
    //         this._usersService.getUsersFromUsersId(_action.users_id)
    //             .pipe(
    //                 map(users => fetchUsersSuccess({ users: users })),
    //                 catchError(error => { console.log(error); return of() })
    //             )
    //     )
    // ))


    fetchLearning$ = createEffect(() => this.actions$.pipe(
        ofType(fetchLearning),
        switchMap((_action) =>
            this._learningService.getLearning(_action.course_id).pipe(
                map(learning => addLearning({ course_id: _action.course_id, learning: learning })),
                catchError(error => of())
            ))
    ));

    createAndUpateLearning$ = createEffect(() => this.actions$.pipe(
        ofType(updateAndCreateLearning),
        switchMap((_action) =>
            this._learningService.updateAndCreateLearning(_action.course_id, _action.chapter_id, _action.lesson_id, _action?.learning_id).pipe(
                map(learning => updateLearing({ course_id: _action.course_id, learning: learning })),
                catchError(error => of())
            ))
    ));

    fetchAllLearningOfuser$ = createEffect(() => this.actions$.pipe(
        ofType(fetchLearnings),
        switchMap(_action => this._learningService.fetchLearnings().pipe(
            map(learnings => addAllLearning({ learnings: learnings })),
            catchError(error => of())
        ))
    ))

}