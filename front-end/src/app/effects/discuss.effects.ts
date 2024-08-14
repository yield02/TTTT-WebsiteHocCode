import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user.service";
import { DiscussService } from "../services/discuss.service";
import { AddDiscuss, CreateDiscuss, DeleteDiscussByAuthor, DeleteDiscussSuccess, FetchingDiscusses, InteractDiscuss, UpdateContentDiscuss, UpdateDiscussSuccess } from "../store/discuss/discuss.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class DiscussEffects {

    constructor(private actions$: Actions, private _discussService: DiscussService) { }

    // fetchUsers$ = createEffect(() => this.actions$.pipe(
    //     ofType(fetchUsers),
    //     switchMap((_action) =>
    //         this._usersService.getUsersFromUsersId(_action.users_id)
    //             .pipe(
    //                 map(users => fetchUsersSuccess({ users: users })),
    //                 catchError(error => { console.log(error); return of() })
    //             )
    //     )
    // ))

    createDiscuss$ = createEffect(() => this.actions$.pipe(
        ofType(CreateDiscuss),
        switchMap((_action) => this._discussService.createDiscuss(_action.discuss).pipe(
            map(discuss => AddDiscuss({ discusses: [discuss] })),
            catchError(error => of())
        ))
    ));

    loadDiscuss$ = createEffect(() => this.actions$.pipe(
        ofType(FetchingDiscusses),
        switchMap((_action) => this._discussService.getDiscussesFromLessonId(_action.lesson_id).pipe(
            map(discusses => AddDiscuss({ discusses })),
            catchError(error => of())
        ))
    ))

    updateContentDiscuss$ = createEffect(() => this.actions$.pipe(
        ofType(UpdateContentDiscuss),
        switchMap(_action => this._discussService.updateContentDiscuss(_action.discuss).pipe(
            map(discuss => UpdateDiscussSuccess({ discuss })),
            catchError(error => of(error))
        ))
    ));

    deleteDiscussByAuthor$ = createEffect(() => this.actions$.pipe(
        ofType(DeleteDiscussByAuthor),
        switchMap(_action => this._discussService.DeleteDiscussByAuthor(_action.discuss_id).pipe(
            map(discuss => DeleteDiscussSuccess({ discuss_id: _action.discuss_id })),
            catchError(error => of(error))
        ))
    ));

    interactDiscuss$ = createEffect(() => this.actions$.pipe(
        ofType(InteractDiscuss),
        switchMap(_action => this._discussService.InteractDiscuss(_action.discuss_id).pipe(
            map(discuss => UpdateDiscussSuccess({ discuss })),
            catchError(error => of())
        ))
    ))

}