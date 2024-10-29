import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FetchUsers, fetchUsersSuccess } from "../store/users/users.actions";
import { catchError, map, of, switchMap, take } from "rxjs";
import { Add, createExercise, createOrUpdateExercise, getExercisesByChapterId, InsertIfNotExists, Update, updateExercise } from "../store/exercise/exercise.actions";
import { ExerciseService } from "../services/exercise.service";

@Injectable({ providedIn: 'root' })
export class ExerciseEffects {

    constructor(private actions$: Actions, private _exerciseService: ExerciseService) { }

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

    getExercisesByChapterId$ = createEffect(() => this.actions$.pipe(
        ofType(getExercisesByChapterId),
        switchMap((_action) =>
            this._exerciseService.getExerciseByChapterId(_action.chapterId)
                .pipe(
                    map(exercises => Add({ exercises: exercises })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

    createExercise$ = createEffect(() => this.actions$.pipe(
        ofType(createExercise),
        switchMap((_action) => this._exerciseService.createExercise(_action.exercise)
            .pipe(
                map(exercises => Add({ exercises: exercises })),
                catchError(error => { console.log(error); return of() })
            )
        )
    ))

    updateExercise$ = createEffect(() => this.actions$.pipe(
        ofType(updateExercise),
        switchMap((_action) => this._exerciseService.updateExercise(_action.exercise)
            .pipe(
                map(exercise => Update({ exercise: exercise })),
                catchError(error => { console.log(error); return of() })
            )
        )
    ));

    createOrUpdateExercise$ = createEffect(() => this.actions$.pipe(
        ofType(createOrUpdateExercise),
        switchMap((_action) =>
            this._exerciseService.createOrUpdateExercise(_action.exercise)
                .pipe(
                    map(exercise => InsertIfNotExists({ exercise: exercise })),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ))

}