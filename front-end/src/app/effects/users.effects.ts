import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FetchUsers, fetchUsersSuccess } from "../store/users/users.actions";
import { catchError, map, mergeMap, of, switchMap, take } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root' })
export class UsersEffects {

    constructor(private actions$: Actions, private _usersService: UserService) { }

    fetchUsers$ = createEffect(() => this.actions$.pipe(
        ofType(FetchUsers),
        mergeMap((_action) =>
            this._usersService.getUsersFromUsersId(_action.users_id)
                .pipe(
                    map(users => {
                        return fetchUsersSuccess({ users: users })
                    }),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ))


}