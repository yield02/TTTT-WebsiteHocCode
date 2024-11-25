import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, type OnInit } from '@angular/core';
import { Course } from '../../../../models/Course';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { Observable, Subscription } from 'rxjs';
import { Subject } from '../../../../models/Subject';
import { selectSubjectWithId } from '../../../../store/subjects/subjects.selectors';
import { ButtonModule } from 'primeng/button';
import { LearningInterFace } from '../../../../models/Learning';
import { selectLearningFromCourseId } from '../../../../store/learning/learning.selectors';
import { ProgressBarModule } from 'primeng/progressbar';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../../../services/course.service';

@Component({
    selector: 'study-home-course',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        ProgressBarModule,
        RouterLink,
    ],
    templateUrl: './study-home-course.component.html',
    styleUrl: './study-home-course.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyHomeCourseComponent implements OnInit, OnDestroy {

    @Input() course!: Course;



    subject$!: Observable<Subject | undefined>;
    learning: LearningInterFace | undefined;
    progress: number = 0;

    learningSubscription: Subscription | undefined;

    constructor(private _store: Store<AppState>, private _courseService: CourseService) {

    }

    ngOnInit(): void {

        this.learningSubscription = this._store.pipe(select(selectLearningFromCourseId(this.course._id!))).subscribe(learning => {
            if (learning) {
                this.learning = learning;
                this.progress = Math.round(this.learning.completed_lessons.length / Number(this.course.totalLesson) * 100);
            }
        });

        this.subject$ = this._store.pipe(
            select(selectSubjectWithId(this.course.subject_id!))
        );


    }


    checkEnroll(): Observable<boolean> {
        return this._courseService.checkUserEnroll(this.course._id as string);
    }

    ngOnDestroy(): void {
        this.learningSubscription?.unsubscribe();
    }

}
