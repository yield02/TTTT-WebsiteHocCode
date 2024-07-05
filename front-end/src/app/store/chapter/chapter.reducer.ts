import { createReducer, on } from '@ngrx/store';
import { Create, Update, Delete } from './chapter.actions';
import { Chapter } from '../../models/Chapter';

export const initialState: Chapter = {
    _id: '',
    title: '',
    content: [],
    order: 0,
}

export const chapterReducer = createReducer(
    initialState,
    on(Create, (state, { chapter }) => {
        return state
    }),
    on(Update, (state, { updateValue }) => {
        console.log(updateValue);
        return { ...state, ...updateValue };
    }),
    on(Delete, (state) => {
        return initialState;
    }),
);