import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { fetchingSubjects, fetchingSubjectsSuccess } from "../store/subjects/subjects.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { SubjectService } from "../services/subject.service";

@Injectable({ providedIn: 'root' })
export class SubjectEffects {

    constructor(private actions$: Actions, private _subjectService: SubjectService) { }

    loadSubjects$ = createEffect(() => this.actions$.pipe(
        ofType(fetchingSubjects),
        switchMap((_action) => this._subjectService.getSubjects().pipe(
            map(res => fetchingSubjectsSuccess({ subjects: res.subjects })),
            catchError(error => of())
        ))
    ))

}