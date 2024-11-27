import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { AdminPostService } from "../../services/admin/admin-post.service";
import { addUsers, deleteUsersSucess, manager_deleteUsers, manager_loadUsers, manager_updateAdminRoleUsers, manager_updateStatusUsers, updateAdminRoleUsersSuccess, updateStatusUsersSuccess } from "../../store/admin/users/users.actions";
import { AdminUserService } from "../../services/admin/admin-user.service";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })

export class AdminUserEffects {

    constructor(
        private actions$: Actions,
        private _adminUserService: AdminUserService,
        private _messageService: MessageService
    ) { }


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


    updateStatus$ = createEffect(() => this.actions$.pipe(
        ofType(manager_updateStatusUsers),
        switchMap((_action) =>
            this._adminUserService.updateStatus(_action.user_ids, _action.status, _action?.reason, _action?.date)
                .pipe(
                    map(() => {
                        this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật trạng thái người dùng thành công.', key: 'global' });
                        return updateStatusUsersSuccess({ user_ids: _action.user_ids, status: _action.status, reason: _action?.reason, date: _action?.date });
                    }),
                    catchError(error => of(error)),
                )
        )
    ));

    updateAdminRole$ = createEffect(() => this.actions$.pipe(
        ofType(manager_updateAdminRoleUsers),
        switchMap((_action) =>
            this._adminUserService.updateAdminRole(_action.user_ids, _action.state)
                .pipe(
                    map(() => {
                        this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật quyền quản trị người dùng thành công.', key: 'global' });
                        return updateAdminRoleUsersSuccess({ user_ids: _action.user_ids, role: _action.state });
                    }),
                    catchError(error => of(error))))
    ))


    deleteComment$ = createEffect(() => this.actions$.pipe(
        ofType(manager_deleteUsers),
        switchMap((_action) =>
            this._adminUserService.deleteUsers(_action.ids).pipe(
                map(() => deleteUsersSucess({ ids: _action.ids })),
                catchError(error => of(error)),
            ),
        )
    ));


}