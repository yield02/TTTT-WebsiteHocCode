import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FetchUsers, fetchUsersSuccess } from "../store/users/users.actions";
import { catchError, map, mergeMap, of, switchMap, take } from "rxjs";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import { deleteAnnouncements, deleteAnnouncementsSuccess, getAnnouncements, getAnnouncementsSuccess, stateChangeAnnouncement, stateChangeAnnouncementSuccess } from "../store/user/user.actions";

@Injectable({ providedIn: 'root' })
export class AuthEffects {

    constructor(private actions$: Actions, private _authService: AuthService) { }

    // fetchUsers$ = createEffect(() => this.actions$.pipe(
    //     ofType(FetchUsers),
    //     mergeMap((_action) =>
    //         this._usersService.getUsersFromUsersId(_action.users_id)
    //             .pipe(
    //                 map(users => {
    //                     return fetchUsersSuccess({ users: users })
    //                 }),
    //                 catchError(error => { console.log(error); return of() })
    //             )
    //     )
    // ))



    getAnnouncements$ = createEffect(() => this.actions$.pipe(
        ofType(getAnnouncements),
        switchMap(() =>
            this._authService.getAnnouncement()
                .pipe(
                    map(res => {
                        return getAnnouncementsSuccess({ announcement: res.announcement })
                    }),
                    catchError(error => { console.log(error); return of() })
                )
        )
    ));

    stateChangeAnnouncement$ = createEffect(() => this.actions$.pipe(
        ofType(stateChangeAnnouncement),
        switchMap((_action) => this._authService.stateChangeAnnouncement(_action.announcement_ids, _action.state).pipe(
            map(() => {
                return stateChangeAnnouncementSuccess({ announcement_ids: _action.announcement_ids, status: _action.state })
            }),
            catchError(error => { console.log(error); return of() })
        ))
    ));

    deleteAnnouncements$ = createEffect(() => this.actions$.pipe(
        ofType(deleteAnnouncements),
        switchMap((_action) => this._authService.deleteAnnouncement(_action.announcement_ids).pipe(
            map(() => {
                return deleteAnnouncementsSuccess({ announcement_ids: _action.announcement_ids })
            }),
            catchError(error => { console.log(error); return of() })
        ))
    ));


}