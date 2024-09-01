import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroChevronRight } from '@ng-icons/heroicons/outline';
import { LessonComponent } from '../lesson/lesson.component';
import { Chapter } from '../../../../models/Chapter';
import { Lesson } from '../../../../models/Lesson';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectLessonsFromChapterId } from '../../../../store/lessons/lessons.selectors';
import { FetchingLessons } from '../../../../store/lessons/lessons.actions';
import { selectLearningFromCourseId } from '../../../../store/learning/learning.selectors';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { LearningInterFace } from '../../../../models/Learning';
import { selectFirstChapterAndLesson } from '../../../../store/courses/courses.selector';

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
    lessons: Lesson[] = [];

    lessonFetching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private _router: Router, private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {

    }

    ngOnInit(): void {


        const course_id = this._activatedRoute.snapshot.paramMap.get("courseId")!;


        this.lessonFetching$.pipe(
            switchMap(isCollapsed => {
                return this._store.pipe(select(selectLessonsFromChapterId(this.chapter._id)), tap(lessons => {
                    if (lessons.length <= 0 && !isCollapsed) {
                        this._store.dispatch(FetchingLessons({ chapter_id: this.chapter._id }))
                        this.isFetched = true;
                        return;
                    }
                    if (lessons.length > 0 && this.lessons.length <= 0) {
                        this.lessons = lessons;
                        this.cdr.detectChanges();
                    }

                }))
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
                if (!params['chapter_id'] && this.index == 1) {
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
