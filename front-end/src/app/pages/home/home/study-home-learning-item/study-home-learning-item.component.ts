import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { LearningInterFace } from '../../../../models/Learning';
import { Observable, switchMap } from 'rxjs';
import { Subject } from '../../../../models/Subject';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { selectCourseFromCourseId } from '../../../../store/courses/courses.selector';
import { selectSubjectWithId } from '../../../../store/subjects/subjects.selectors';
import { Course } from '../../../../models/Course';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'study-home-learning-item',
    standalone: true,
    imports: [
        CommonModule,
        ProgressBarModule,
        ButtonModule,
        RouterLink,
    ],
    templateUrl: './study-home-learning-item.component.html',
    styleUrl: './study-home-learning-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyHomeLearningItemComponent {

    @Input() learning!: LearningInterFace;
    course!: Course;


    subject$!: Observable<Subject | undefined>;


    progress: number = 0;


    constructor(private _store: Store<AppState>, private _changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.subject$ = this._store.pipe(
            select(selectCourseFromCourseId(this.learning.course_id!)),
            switchMap((course: Course | undefined) => {

                if (course) {
                    this.course = course;
                    this.progress = Math.round(this.learning.completed_lessons.length / Number(course.totalLesson) * 100);
                    this._changeDetector.detectChanges()
                }

                return this._store.pipe(select(selectSubjectWithId(course?.subject_id!)));
            })
        ) as Observable<Subject | undefined>;

    }
}   
