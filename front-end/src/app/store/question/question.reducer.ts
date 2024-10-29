import { createReducer, on } from '@ngrx/store';

import { Question } from '../../models/Question';
import { Add, Remove, Update, Updates } from './question.actions';
import { state } from '@angular/animations';

export const initialState: Question[] = [];

export const questionReducer = createReducer(
    initialState,
    on(Add, (state, { questions }) => {
        return [...state, ...questions];
    }),
    on(Remove, (state, { question_ids }) => {
        return state.filter((question) => !question_ids.includes(question._id));
    }),
    on(Update, (state, { question }) => {
        console.log(question);
        return state.map(item => item._id === question._id ? question : item);
    }),

    on(Updates, (state, { questions }) => {

        return state.map((item) => {
            const index = questions.findIndex((question) => question._id === item._id);
            if (index > -1) {
                return questions[index];
            }
            return item;
        })

    }),
);