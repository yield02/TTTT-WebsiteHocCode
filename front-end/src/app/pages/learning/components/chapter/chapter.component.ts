import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroChevronRight } from '@ng-icons/heroicons/outline';
import { LessonComponent } from '../lesson/lesson.component';
import { Chapter } from '../../../../models/Chapter';
import { Lesson } from '../../../../models/Lesson';
import { BehaviorSubject, combineLatest, Observable, of, switchMap, tap } from 'rxjs';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectLessonsFromChapterId } from '../../../../store/lessons/lessons.selectors';
import { FetchingLessons } from '../../../../store/lessons/lessons.actions';
import { selectLearningFromCourseId } from '../../../../store/learning/learning.selectors';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { LearningInterFace } from '../../../../models/Learning';
import { selectFirstChapterAndLesson } from '../../../../store/courses/courses.selector';
import { getQuestionsFromLessionIds } from '../../../../store/question/question.actions';
import { getExercisesByChapterId } from '../../../../store/exercise/exercise.actions';
import { selectQuestionsFromLessonIds } from '../../../../store/question/question.selectors';
import { selectExercisesByChapterId } from '../../../../store/exercise/exercise.selectors';

@Component({
    selector: 'learning-chapter',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,

        LessonComponent
    ],
    providers: [provideIcons({ heroChevronRight, heroChevronDown })],
    templateUrl: './chapter.component.html',
    styleUrl: './chapter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnInit {
    @Input() chapter!: Chapter;
    @Input() index!: number;


    isCollapsed: boolean = true;
    isFetched: boolean = false;
    isFetchQuestion: boolean = false;
    isFetchExercises: boolean = false;

    lessons: Lesson[] = [];

    lessonFetching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private _router: Router, private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        const course_id = this._activatedRoute.snapshot.paramMap.get("courseId")!;


        this._store.pipe(select(selectLearningFromCourseId(course_id))).subscribe(learning => {
            if (!learning && this.index == 1) {
                this.isCollapsed = false;
                this.lessonFetching$.next(this.isCollapsed);
            }
        })

        this.lessonFetching$.pipe(
            switchMap(isCollapsed => {
                return this._store.pipe(select(selectLessonsFromChapterId(this.chapter._id)),
                    switchMap(lessons => {
                        if (lessons.length <= 0 && !isCollapsed) {
                            this._store.dispatch(FetchingLessons({ chapter_id: this.chapter._id }))
                            this.isFetched = true;
                            of(null);
                        }

                        if (lessons.length > 0 && this.lessons.length <= 0) {
                            this.lessons = lessons;
                            this.cdr.detectChanges();

                            const lesson_ids: string[] = lessons.map(lesson => lesson._id as string);

                            return combineLatest({
                                questions: this._store.pipe(select(selectQuestionsFromLessonIds(lesson_ids))),
                                exercises: this._store.pipe(select(selectExercisesByChapterId(this.chapter._id as string))),
                                lesson_ids: of(lesson_ids)
                            })
                        }

                        return of(null);
                    }),
                    tap((data: any) => {
                        if (data) {
                            const { questions, exercises, lesson_ids } = data;
                            if (questions?.length <= 0 && !this.isFetchQuestion) {
                                this._store.dispatch(getQuestionsFromLessionIds({ lesson_ids: lesson_ids }));
                                this.isFetchQuestion = true;

                            }

                            if (exercises?.length <= 0 && !this.isFetchExercises) {
                                this._store.dispatch(getExercisesByChapterId({ chapterId: this.chapter._id as string }));
                                this.isFetchExercises = true;
                            }
                        }
                    })
                )
            })
        ).subscribe();

        this._activatedRoute.queryParams.pipe<Params>(
            tap((params) => {
                if (params['chapter_id'] == this.chapter._id) {
                    this.isCollapsed = false;
                    this.lessonFetching$.next(this.isCollapsed);
                    this.cdr.detectChanges();
                    return;
                }
            })
        ).subscribe();
    }




    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
        this.lessonFetching$.next(this.isCollapsed);
    }
}
