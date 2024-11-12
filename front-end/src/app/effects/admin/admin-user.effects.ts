import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AdminPostService } from "../../services/admin/admin-post.service";
import { addUsers, manager_loadUsers } from "../../store/admin/users/users.actions";
import { AdminUserService } from "../../services/admin/admin-user.service";

@Injectable({ providedIn: 'root' })

export class AdminUserEffects {

    constructor(private actions$: Actions, private _adminUserService: AdminUserService) { }


    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(manager_loadUsers),
        switchMap((_action) =>
            this._adminUserService.getUsers()
                .pipe(
                    map(users => addUsers({ users: users })),
                    catchError(error => of(error))
                )
        )
    ))


}