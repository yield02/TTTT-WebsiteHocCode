import { createReducer, on } from '@ngrx/store';
import { Update, Delete, Add, InsertIfNotExists } from './exercise.actions';
import { AuthUser, User } from '../../models/User';
import { Exercise } from '../../models/Exercise';

export const initialState: Exercise[] = []

export const exerciseReducer = createReducer(
    initialState,
    on(Add, (state, { exercises }) => [...state, ...exercises]),
    on(Update, (state, { exercise }) => {
        return state.map(item => item._id === exercise._id ? exercise : item);
    }),
    on(Delete, (state) => {
        return initialState;
    }),
    on(InsertIfNotExists, (state, { exercise }) => {
        return [...state.filter(item => item._id !== exercise?._id), exercise];
    })
);