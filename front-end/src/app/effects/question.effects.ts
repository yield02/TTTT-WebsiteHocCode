import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { Add, createQuestions, deleteQuestions, getQuestionsFromLessionIds, Remove, Update, updateQuestion } from "../store/question/question.actions";
import { QuestionService } from "../services/question.service";

@Injectable({ providedIn: 'root' })
export class QuesionEffects {

    constructor(private actions$: Actions, private _questionSerive: QuestionService) { }

    getQuestionFromLessonId$ = createEffect(() => this.actions$.pipe(
        ofType(getQuestionsFromLessionIds),
        switchMap((_action) =>
            this._questionSerive.getQuestionsFromLessonId(_action.lesson_ids)
                .pipe(
                    map(questions => Add({ questions: questions })),
                    catchError(error => of())
                )
        )
    ));

    createQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(createQuestions),
        switchMap((_action) =>
            this._questionSerive.createQuestions(_action.questions)
                .pipe(
                    map(questions => Add({ questions: questions })),
                    catchError(error => of())))
    ));


    updateQuestion$ = createEffect(() => this.actions$.pipe(
        ofType(updateQuestion),
        switchMap((_action) =>
            this._questionSerive.updateQuestion(_action.question)
                .pipe(
                    map(question => Update({ question: question })),
                    catchError(error => of())))
    ));


    deleteQuestions$ = createEffect(() => this.actions$.pipe(
        ofType(deleteQuestions),
        switchMap((_action) =>
            this._questionSerive.deleteQuestions(_action.question_ids)
                .pipe(
                    map(() => Remove({ question_ids: _action.question_ids })),
                    catchError(error => of())
                )
        )
    ))

}