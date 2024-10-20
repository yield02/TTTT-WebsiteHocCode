import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../models/User';
import { Question } from '../../models/Question';

export const createQuestions = createAction('[Question Store] create', props<{ questions: Question[] }>());
export const getQuestionsFromLessionId = createAction('[Question Store] getQuestionFromLessionId', props<{ lesson_id: string }>());
export const updateQuestion = createAction('[Question Store] updateQuestion', props<{ question: Question }>());
export const deleteQuestions = createAction('[Question Store] deleteQuestions', props<{ question_ids: string[] }>());


export const Add = createAction('[Question Component] AddQuestions', props<{ questions: Question[] }>());
export const Remove = createAction('[Question Component] RemoveQuestions', props<{ question_ids: string[] }>());
export const Update = createAction('[Question Component] UpdateQuestions', props<{ question: Question }>());
export const Updates = createAction('[Question Component] UpdateQuestions', props<{ questions: Question[] }>());