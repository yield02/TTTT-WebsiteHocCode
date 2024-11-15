import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { PostService } from "../../services/forum/post.service";
import { Router } from "@angular/router";
import { AdminPostService } from "../../services/admin/admin-post.service";
import { addPosts, manager_loadPosts } from "../../store/admin/post/post.actions";
import { AdminReportService } from "../../services/admin/admin-report.service";
import { deleteReportSucess, manager_deleteReports, manager_loadReports, manager_loadReportsSuccess, manager_updateStatusReports, updateStatusReportSuccess } from "../../store/admin/report/report.actions";

@Injectable({ providedIn: 'root' })

export class AdminReportEffects {

    constructor(private actions$: Actions, private _adminReportService: AdminReportService) { }


    loadReports$ = createEffect(() => this.actions$.pipe(
        ofType(manager_loadReports),
        switchMap((_action) =>
            this._adminReportService.getReports()
                .pipe(
                    map(reports => manager_loadReportsSuccess({ reports: reports })),
                    catchError(error => of(error))
                )
        )
    ))


    updateStatus$ = createEffect(() => this.actions$.pipe(
        ofType(manager_updateStatusReports),
        switchMap((_action) =>
            this._adminReportService.updateStatus(_action.report_ids, _action.state)
                .pipe(
                    map(() => updateStatusReportSuccess({ report_ids: _action.report_ids, status: _action.state })),
                    catchError(error => of(error)),
                )
        )
    ))


    deletePost$ = createEffect(() => this.actions$.pipe(
        ofType(manager_deleteReports),
        switchMap((_action) =>
            this._adminReportService.deletePosts(_action.ids).pipe(
                map(() => deleteReportSucess({ ids: _action.ids })),
                catchError(error => of(error)),
            ),
        )
    ))

}