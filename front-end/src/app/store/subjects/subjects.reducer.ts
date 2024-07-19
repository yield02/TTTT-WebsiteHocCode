import { createReducer, on } from '@ngrx/store';
import { Subject } from '../../models/Subject';
import { fetchingSubjectsSuccess } from './subjects.actions';

export const initialState: Subject[] = []

export const subjectsReducer = createReducer(
    initialState,
    on(fetchingSubjectsSuccess, (state, { subjects }) => {
        return [...subjects];
    })
);