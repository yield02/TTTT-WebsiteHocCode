import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SubjectService } from "../services/subject.service";
import { CourseService } from "../services/course.service";
import { FetchingCourseFromCourseId, FetchingCourseFromCourseIds, FetchingCoursesFromSubjectIds, FetchingCoursesSucess, UserEnrollCourse, UserEnrollCourseSucess } from "../store/courses/courses.actions";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { MessageService } from "primeng/api";

@Injectable({ providedIn: 'root' })
export class CourseEffects {

    constructor(private actions$: Actions, private _subjectService: SubjectService, private _coursesService: CourseService, private _message: MessageService) { }

    loadCourses$ = createEffect(() => this.actions$.pipe(
        ofType(FetchingCoursesFromSubjectIds),
        mergeMap((_action) => this._coursesService.getCoursesBySubjectIds(_action.subject_ids).pipe(
            map(res => FetchingCoursesSucess({ courses: res.courses })),
            catchError(error => of())
        ))
    ));

    loadCourse$ = createEffect(() => this.actions$.pipe(
        ofType(FetchingCourseFromCourseId),
        mergeMap((_action) => this._coursesService.getCourseFromCourseId(_action.course_id).pipe(
            map(course => FetchingCoursesSucess({ courses: [course] })),
            catchError(error => of())
        ))
    ));

    userEnrollment$ = createEffect(
        () => this.actions$.pipe(
            ofType(UserEnrollCourse),
            mergeMap((_action) => this._coursesService.UserEnrollCourse(_action.course_id).pipe(
                map((course) => {
                    this._message.add({ severity: 'success', summary: 'Ghi danh thành công, vui lòng chờ giảng viên duyệt yêu cầu', key: "global" });
                    return UserEnrollCourseSucess({ course });
                }),
                catchError(error => of())
            ))
        )
    );

    fetchCoursesFromCoursesId$ = createEffect(
        () => this.actions$.pipe(
            ofType(FetchingCourseFromCourseIds),
            switchMap(_action => this._coursesService.getCoursesByCourseIds(_action.course_ids).pipe(
                map(courses => FetchingCoursesSucess({ courses })),
                catchError(error => of())
            ))
        ))

    // acceptEnrollment$ = createEffect(() => this.actions$.pipe());
}