import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { Lesson } from '../../../../models/Lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, takeUntil, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectLearningFromCourseId } from '../../../../store/learning/learning.selectors';
import { LearningInterFace } from '../../../../models/Learning';

@Component({
    selector: 'learning-lesson',
    standalone: true,
    imports: [
        CommonModule,

        NgIconComponent
    ],
    providers: [provideIcons({
        bootstrapPersonVideo,
        ionDocumentTextOutline,
        heroCheckCircleSolid
    })],
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit {
    @Input() lesson!: Lesson;
    @Input() index!: number;
    @Input() chapter_index!: number;
    @Input() chapter_id!: String;


    active$!: Observable<boolean>;
    learned: boolean = false;
    naviagated: boolean = false;


    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _store: Store<AppState>, private cdr: ChangeDetectorRef) {

    }


    // ngDoCheck(): void {
    //     if (this.index == 1 && this.chapter_index == 1) {
    //         this._router.navigate([`/learning/${this.lesson.course_id}`], { queryParams: { chapter_id: this.chapter_id, lesson_id: this.lesson._id } });
    //     }
    // }


    ngOnInit(): void {


        // this._store.pipe(select(selectLearningFromCourseId(this._activatedRoute.snapshot.params['courseId']),), tap((learning: LearningInterFace | undefined) => {
        //     console.log(1);
        //     if (!!learning && !this.naviagated) {
        //         this.naviagated = true;
        //         // this._router.navigate([`/learning/${this._activatedRoute.snapshot.params['courseId']}`], { queryParams: { chapter_id: learning.current_chapter, lesson_id: learning.completed_lessons } });
        //         return;
        //     }
        //     if (this.index == 1 && this.chapter_index == 1) {
        //         this._router.navigate([`/learning/${this.lesson.course_id}`], { queryParams: { chapter_id: this.chapter_id, lesson_id: this.lesson._id } });
        //     }
        // })).subscribe();




        this.active$ = this._activatedRoute.queryParams.pipe(
            map(params => {
                if (params['lesson_id'] === this.lesson._id) {
                    return true;
                }
                else {
                    return false;
                }
            })
        );


        this._store.pipe(select(selectLearningFromCourseId(this.lesson.course_id)), tap((learning: LearningInterFace | undefined) => {
            this.learned = learning?.completed_lessons?.includes(this.lesson._id) || false;
            this.cdr.detectChanges();
        })).subscribe();


    }





    checkrender(learned: boolean) {
        console.log('render:', learned);
    }

    navigateToLesson() {
        this._router.navigate([`/learning/${this.lesson.course_id}`], { queryParams: { chapter_id: this.chapter_id, lesson_id: this.lesson._id } });
    }
    ngOnDestroy(): void {
        console.log('destroy');
    }
}
