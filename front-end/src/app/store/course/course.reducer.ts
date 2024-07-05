import { createReducer, on } from '@ngrx/store';
import { Create, Update, Delete } from './course.actions';
import { Course } from '../../models/Course';

export const initialState: Course = {
    _id: '',
    course_name: '',
    description: '',
}

export const courseReducer = createReducer(
    initialState,
    on(Create, (state, { course }) => {
        console.log(course);
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