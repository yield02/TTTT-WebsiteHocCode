import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { CreateChapter, CreateChapterSuccess, DeleteChapter, DeleteChapterSuccess, FetchChaptersSucess, FetchingChapters, UpdateChapter, UpdateChapterError, UpdateChapterSuccess, UpdateChapterTitle } from '../store/chapters/chapters.actions';
import { AddChapter, DeleteChapter as CourseDeleteChapter, SortChapter, UpdateCourseManager } from '../store/mycoursemanager/mycoursemanager.actions';
import { ChapterService } from '../services/chapter.service';
import { AppState } from '../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectChapterFromId } from '../store/chapters/chapters.selectors';
import { Chapter } from '../models/Chapter';
import { DeleteLessons } from '../store/lessons/lessons.actions';

@Injectable({ providedIn: 'root' })
export class ChapterEffects {

    constructor(private actions$: Actions, private chapterService: ChapterService, private _store: Store<AppState>) { }

    createChapter$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CreateChapter), // Lắng nghe action Create
            switchMap(_action =>
                this.chapterService.createChapter(_action.createChapter)
                    .pipe(
                        map(res => CreateChapterSuccess({ chapter: res.chapter })),
                        map(data => ({ ...data, course_id: _action.createChapter.course_id }))
                    ),
            ),
            switchMap((action: any) => of(action, AddChapter({ course_id: action.course_id, chapter_id: action.chapter._id })))
        )
    );

    deleteChapter$ = createEffect(
        () => this.actions$.pipe(
            ofType(DeleteChapter),
            switchMap(_action =>
                this.chapterService.deleteChapter(_action.course_id, _action.chapter_id)
                    .pipe(
                        tap(data => {
                            this._store.pipe(select(selectChapterFromId(_action.chapter_id)),
                                tap((chapter: Chapter | undefined) => {
                                    if (chapter?.lessons?.length) {
                                        this._store.dispatch(DeleteLessons({ lessons_id: chapter.lessons! }))
                                    }
                                })
                            ).subscribe()
                        }),
                        map(() => DeleteChapterSuccess({ chapter_id: _action.chapter_id })),
                        map(data => ({ ...data, course_id: _action.course_id }))
                    )
            ),
            switchMap((action: any) => {
                return of(action, CourseDeleteChapter({ course_id: action.course_id, chapter_id: action.chapter_id }))
            })
        ));


    updateChapterTitle$ = createEffect(() => this.actions$.pipe(
        ofType(UpdateChapterTitle),
        switchMap(_action =>
            this.chapterService.updateChapter(_action.chapter_id, _action.title).pipe(
                map(() => UpdateChapterSuccess({ chapter_id: _action.chapter_id, title: _action.title })),
                // catchError(() => {
                //     console.log('false');
                //     return of();
                // })
            )
        ),
    ))

    loadChapter$ = createEffect(() => this.actions$.pipe(
        ofType(FetchingChapters),
        mergeMap(_action => {
            return this.chapterService.getChaptersFromCourseId(_action.course_id)
                .pipe(
                    map(chapters => FetchChaptersSucess({ fetchValue: chapters })),
                    catchError(error => of())
                )
        })
    ));

    sortChapter$ = createEffect(() => this.actions$.pipe(
        ofType(SortChapter),
        mergeMap(_action => {
            return this.chapterService.sortChapter(_action.course_id as string, _action.chapters_id as string[])
                .pipe(
                    map(course => UpdateCourseManager({ course: course })),
                    catchError(error => of())
                )
        })
    ))
}