import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Lesson } from '../../../../models/Lesson';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { QuestionComponent } from './question/question.component';
import { Question } from '../../../../models/Question';
import { EditorModule } from '@tinymce/tinymce-angular';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { selectQuestionsFromLessonId } from '../../../../store/question/question.selectors';
import { deleteQuestions, updateQuestion } from '../../../../store/question/question.actions';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-exercise-manager',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        QuestionComponent,
        EditorModule,
    ],
    templateUrl: `./exercise-manager.component.html`,
    styleUrl: './exercise-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseManagerComponent implements OnInit, OnChanges {
    @Input() lesson!: Lesson;

    questions: Question[] = [];

    questionSubscription: Subscription | undefined;

    constructor(private _dynamicDialogConfig: DynamicDialogConfig, private _dynamicDialogRef: DynamicDialogRef, private _changeDetector: ChangeDetectorRef, private _store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.lesson = this._dynamicDialogConfig?.data?.lesson;


        this.questionSubscription = this._store.pipe(select(selectQuestionsFromLessonId(this.lesson._id! as string))).subscribe(questions => {
            this.questions = questions;
            this._changeDetector.detectChanges(); // trigger change detection to update the component view with the new data.
        })
    }

    addQuestion(): void {
        this.questions.push({
            _id: '',
            title: '',
            content: '',
            type: 'code',
            options: [],
            answer: [],
            explanation: '',
            testKey: [],
        });
    }

    updateQuestion(event: { question: Question, index: number }): void {
        if (JSON.stringify(this.questions[event.index]) != JSON.stringify(event.question)) {
            this.questions[event.index] = event.question;
            if (event.question?._id) {
                this._store.dispatch(updateQuestion({ question: event.question }));
            }
        }
    }

    removeQuestion(index: number): void {
        if (this.questions[index]?._id) {
            this._store.dispatch(deleteQuestions({ question_ids: [this.questions[index]._id as string] }));
        }
        this.questions.splice(index, 1);
    }

    closeDialog() {
        this._dynamicDialogRef.close(
            this.questions.filter(question => !question?._id)
        );
    }

    ngOnChanges(): void {
        this.questionSubscription?.unsubscribe();
    }

}
