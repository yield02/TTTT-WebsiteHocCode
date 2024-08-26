import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, take, tap } from 'rxjs';
import { LessonService } from '../services/lesson.service';
import { CreateLesson, CreateLessonSucess, DeleteLesson, DeleteLessonSucess, FetchingLessons, FetchingLessonSucess, UpdateLesson, UpdateLessonSucess } from '../store/lessons/lessons.actions';
import { ChapterCreateLesson, ChapterDeleteLesson, ChapterUpdateLesson } from '../store/chapters/chapters.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import { isFetchingLessons } from '../store/lessons/lessons.selectors';

@Injectable({ providedIn: 'root' })
export class LessonEffects {

    constructor(private actions$: Actions, private lessonService: LessonService, private _store: Store<AppState>) { }

    createLesson$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateLesson), // Lắng nghe action Create
            switchMap(_action =>
                this.lessonService.createLesson(_action.createLesson)
                    .pipe(
                        map(res => CreateLessonSucess({ lesson: res.lesson })),
                        map(data => ({ ...data, course_id: _action.createLesson.chapter_id, chapter_id: _action.createLesson.chapter_id }))
                    ),
            ),
            switchMap((action: any) => {
                return of(action, ChapterCreateLesson({ chapter_id: action.chapter_id, lesson_id: action.lesson._id }))
            }),
            catchError(error => of())
        )
    );


    loadLesson$ = createEffect(() => this.actions$.pipe(
        ofType(FetchingLessons),
        switchMap(_action => this.lessonService.getLessons(_action.chapter_id).pipe(
            map(res => FetchingLessonSucess({ lessons: res.lessons })),
            catchError(error => of())
        ))
    ));

    updateLesson$ = createEffect(() => this.actions$.pipe(
        ofType(UpdateLesson),
        switchMap(_action =>
            this.lessonService.updateLesson(_action.lesson).pipe(
                map(() => UpdateLessonSucess({ lesson: _action.lesson })),
                catchError(() => of())
            )
        ),
        switchMap((_action: any) => [_action, ChapterUpdateLesson(
            {
                old_chapter_id: _action.lesson.old_chapter_id,
                new_chapter_id: _action.lesson.new_chapter_id,
                lesson_id: _action.lesson._id
            })])
    ));

    deleteLesson$ = createEffect(() => this.actions$.pipe(
        ofType(DeleteLesson),
        switchMap(_action => this.lessonService.deleteLesson(_action.chapter_id, _action.lesson_id).pipe(
            map(() => DeleteLessonSucess({ lesson_id: _action.lesson_id })),
            map(data => ({ ...data, chapter_id: _action.chapter_id }))
        )),
        switchMap((_action: any) => {
            return [_action, ChapterDeleteLesson({ chapter_id: _action.chapter_id, lesson_id: _action.lesson_id })]
        })
    ));

}