import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseManagerService } from "../services/course-manger.service";
import { AcceptEnroll, Add, DeleteUserEnrollFromAuth, FetchCourseManager, fetchUsersInCourse, RejectEnroll, toggleUpdatePublishCourse, UpdateCourseManager } from "../store/mycoursemanager/mycoursemanager.actions";
import { catchError, debounceTime, map, of, switchMap, take, tap, throttleTime, timer } from "rxjs";
import { fetchUsersSuccess } from "../store/users/users.actions";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class CoursesManagerEffects {

    constructor(
        private actions$: Actions,
        private _courseManagerService: CourseManagerService,
        private _messageService: MessageService,
    ) { }

    loadCourse$ = createEffect(() => this.actions$.pipe(
        ofType(FetchCourseManager),
        switchMap(_action => this._courseManagerService.getCourseManagerFromCourseId(_action.course_id)
            .pipe(
                map(res => Add({ courses: [res] })),
                catchError((error) => of())
            )
        )
    ))

    enrollAccept$ = createEffect(() => this.actions$.pipe(
        throttleTime(1000),
        ofType(AcceptEnroll),
        switchMap(_action => this._courseManagerService.acceptEnroll(_action.course_id, _action.enrolls_id)
            .pipe(
                map((course) => {
                    this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã chấp nhận yêu cầu', key: "global" })
                    return UpdateCourseManager({ course })
                }),
                catchError((error) => of())
            )
        )
    ));

    enrollReject$ = createEffect(() => this.actions$.pipe(
        ofType(RejectEnroll),
        switchMap(_action => this._courseManagerService.rejectEnroll(_action.course_id, _action.enrolls_id).pipe(
            map((course) => {
                this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã từ chối yêu cầu', key: "global" })
                return UpdateCourseManager({ course })
            }),
            catchError((error) => of())
        ))))


    // findUsersWithUserName$ = createEffect(() => this.actions$.pipe(
    //     ofType(FindUserInCourseWithUserName),
    //     switchMap(_action => this._courseManagerService.findUsersWithUserName(_action.username, _action.course_id, _action.typeList)
    //         .pipe(
    //             map((users) => fetchUsersSuccess({ users: users })),
    //             catchError((error) => of())
    //         )
    //     )));

    fetchUsersInCourse$ = createEffect(() => this.actions$.pipe(
        ofType(fetchUsersInCourse),
        switchMap(_action => this._courseManagerService.getUsersInCourse(_action.course_id, _action.filter, _action.typeList)
            .pipe(
                map((users) => fetchUsersSuccess({ users: users })),
                catchError((error) => of())
            )
        )
    ));

    deleteEnrollFromAuth$ = createEffect(() => this.actions$.pipe(
        ofType(DeleteUserEnrollFromAuth),
        switchMap(_action => this._courseManagerService.deleteUserEnrollFromAuth(_action.course_id, _action.users_id)
            .pipe(
                map((course) => {
                    this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã xóa người dùng khỏi khóa học', key: "global" })
                    return UpdateCourseManager({ course });
                }),
                catchError((error) => of())
            )
        )
    ));

    toggleUpdatePublishCourse$ = createEffect(() => this.actions$.pipe(
        ofType(toggleUpdatePublishCourse),
        debounceTime(1000),
        switchMap(_action => this._courseManagerService.toggleUpdatePublishCourse(_action.course_id, _action.state)
            .pipe(
                map((course) => {
                    this._messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đã cập nhật trạng thái khóa học', key: "global" })
                    return UpdateCourseManager({ course });
                }),
                catchError((error) => of())
            ))
    ))
}   