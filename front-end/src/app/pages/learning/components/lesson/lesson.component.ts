import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { Lesson } from '../../../../models/Lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, take, takeUntil, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectLearningFromCourseId } from '../../../../store/learning/learning.selectors';
import { LearningInterFace } from '../../../../models/Learning';
import { Question } from '../../../../models/Question';
import { selectQuestionsFromLessonId } from '../../../../store/question/question.selectors';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ShowQuestionComponent } from './show-question/show-question.component';
import { Exercise } from '../../../../models/Exercise';
import { selectExercisesByLessonId } from '../../../../store/exercise/exercise.selectors';

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
    }), DialogService],
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit {
    @Input() lesson!: Lesson;
    @Input() index!: number;
    @Input() chapter_index!: number;
    @Input() chapter_id!: String;

    questions: Question[] = [];
    exercises: Exercise[] = [];

    active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    learned: boolean = false;
    naviagated: boolean = false;


    questionDyalogRef: DynamicDialogRef | undefined;

    constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private _store: Store<AppState>, private cdr: ChangeDetectorRef, private _dialogService: DialogService) {

    }


    ngOnInit(): void {

        const course_id = this._activatedRoute.snapshot.params['courseId'];

        this._store.pipe(select(selectLearningFromCourseId(course_id))).subscribe(learning => {
            if (learning && learning.completed_lessons.includes(this.lesson._id)) {
                this.learned = true;
                this.cdr.detectChanges();
            }
        });

        this._store.pipe(select(selectExercisesByLessonId(this.lesson._id as string))).subscribe(exercise => {
            this.exercises = exercise;
            this.cdr.detectChanges();
        })

        this._activatedRoute.queryParams.pipe(
            map(params => {
                if (params['lesson_id'] === this.lesson._id) {
                    this.active$.next(true);
                }
                else {
                    this.active$.next(false);
                }
            })
        ).subscribe();


        // this._store.pipe(select(selectLearningFromCourseId(this.lesson.course_id)), take(2), tap((learning: LearningInterFace | undefined) => {
        //     this.learned = learning?.completed_lessons?.includes(this.lesson._id) || false;
        //     this.cdr.detectChanges();
        // })).subscribe();


        this._store.pipe(select(selectQuestionsFromLessonId(this.lesson._id as string)), tap((questions: Question[]) => {
            if (questions.length > 0) {
                this.questions = questions;
                this.cdr.detectChanges();
            }

            // if (questions.length <= 0 && !this.fetchedQuestion) {
            //     console.log(questions.length, this.fetchedQuestion)
            //     this._store.dispatch(getQuestionsFromLessionId({ lesson_id: this.lesson._id as string }));
            //     this.fetchedQuestion = true;
            // }
        })).subscribe();

    }


    showQuestionDialog(question: Question, index: number): void {
        console.log('co show');

        this.questionDyalogRef = this._dialogService.open(ShowQuestionComponent, {
            data: {
                question: question,
                exercise: this.exercises.find(exercise => exercise.question_id == question._id)
            },
            width: '90%',
            height: '90%',
            contentStyle: {
                'padding-bottom': '4.5rem'
            },
            header: `Bài tập ${index + 1}`,
        });

        this.questionDyalogRef?.onClose.subscribe((result: any) => {
            if (result == 'next') {
                if (index >= this.questions.length) {
                    // this.questionDyalogRef?.close();
                    this.questionDyalogRef?.destroy();
                    this.showQuestionDialog(this.questions[0], 0);
                }
                else {
                    // this.questionDyalogRef?.close();
                    this.questionDyalogRef?.destroy();

                    this.showQuestionDialog(this.questions[index + 1], index + 1);
                }
            }
            else if (result == 'back') {
                if (index <= 0) {
                    // this.questionDyalogRef?.close();
                    this.questionDyalogRef?.destroy();

                    this.showQuestionDialog(this.questions[this.questions.length - 1], this.questions.length - 1);
                }
                else {
                    // this.questionDyalogRef?.close();
                    this.questionDyalogRef?.destroy();

                    this.showQuestionDialog(this.questions[index - 1], index - 1);
                }
            }
        });

    }





    checkrender(learned: boolean) {
        console.log('render:', learned);
    }

    navigateToLesson() {
        this._router.navigate([`/learning/${this.lesson.course_id}`], { queryParams: { chapter_id: this.chapter_id, lesson_id: this.lesson._id } });
    }
    ngOnDestroy(): void {
        console.log('destroy');
        this.questionDyalogRef?.close();
    }

    checkQuestion(question: Question) {
        return this.exercises.some(exercise => exercise.question_id == question._id);
    }
    checkAnswer(question: Question) {
        const exercise = this.exercises.find(exercise => exercise.question_id == question._id);
        if (!exercise) {
            return null;
        }
        return exercise.status;
    }
}
