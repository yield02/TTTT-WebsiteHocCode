import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Question } from "../../models/Question";

export const selectQuestionState = (state: AppState) => state.question;



export const selectQuestionFromQuestionId = (question_id: string) =>
    createSelector(selectQuestionState, (questions: Question[]) => {
        return questions.find((question: Question) => question._id == question_id);
    });

export const selectQuestionsFromQuestionIds = (questionIds: string[]) =>
    createSelector(selectQuestionState, (questions: Question[]) => {
        return questions.filter((question: Question) => questionIds.includes(question._id));
    });


export const selectQuestionsFromLessonId = (lesson_id: string) => createSelector(
    selectQuestionState,
    (questions: Question[]) => {
        return questions.filter((question: Question) => question.lesson_id === lesson_id);
    }
);

