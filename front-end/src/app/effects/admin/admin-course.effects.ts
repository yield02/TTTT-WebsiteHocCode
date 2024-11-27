import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { PostService } from "../../services/forum/post.service";
import { Router } from "@angular/router";
import { AdminPostService } from "../../services/admin/admin-post.service";
import { addPosts, manager_loadPosts } from "../../store/admin/post/post.actions";
import { AdminCourseService } from "../../services/admin/admin-course.service";
import { deleteCourseSuccess, manager_deleteCourses, manager_loadCourses, manager_loadCoursesSuccess, manager_loadLessons, manager_loadLessonsSuccess, manager_updateStatusCourses, updateStatusCoursesSuccess } from "../../store/admin/course/course.actions";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })

export class AdminCourseEffects {

    constructor(private actions$: Actions, private _adminCourseService: AdminCourseService, private _messageSerive: MessageService) { }


    //     manager_loadCourses
    loadCourses$ = createEffect(() => this.actions$.pipe(
        ofType(manager_loadCourses),
        switchMap((_action) =>
            this._adminCourseService.getCourses().pipe(
                map((courses) => {
                    return manager_loadCoursesSuccess({ courses });
                }))
        ))
    );

    // manager_updateStatusCourses
    updateStatusCourses$ = createEffect(() => this.actions$.pipe(
        ofType(manager_updateStatusCourses),
        switchMap((_action) =>
            this._adminCourseService.updateStatus(_action.course_ids, _action.status, _action?.reason).pipe(
                map(() => {
                    this._messageSerive.add({ severity: 'success', summary: 'Thành công', detail: 'Thay đổi trạng thái khóa học thành công.', key: 'global' });
                    return updateStatusCoursesSuccess({ course_ids: _action.course_ids, status: _action.status, reason: _action?.reason });
                }),
                catchError(error => of(error))
            )
        )
    ));

    // manager_deleteCourses
    deleteCourses$ = createEffect(() => this.actions$.pipe(
        ofType(manager_deleteCourses),
        switchMap((_action) =>
            this._adminCourseService.deleteCourse(_action.ids).pipe(
                map(() => {
                    this._messageSerive.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa khóa học thành công.', key: 'global' });
                    return deleteCourseSuccess({ ids: _action.ids });
                }),
                catchError(error => of(error))
            )
        )
    ));

    // manager_loadLessons

    loadLessons$ = createEffect(() => this.actions$.pipe(
        ofType(manager_loadLessons),
        switchMap((_action) =>
            this._adminCourseService.getLessons().pipe(
                map((lessons) => {
                    return manager_loadLessonsSuccess({ lessons });
                }))

        )))


}