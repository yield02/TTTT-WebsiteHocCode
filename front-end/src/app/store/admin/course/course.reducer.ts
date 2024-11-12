import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Course } from '../../../models/Course';

export const initialState: Course[] = [];

export const admin_CourseReducer = createReducer(
    initialState,
    // on(Update, (state, { updateValue }) => {
    //     // console.log(updateValue);
    //     return { ...state, ...updateValue };
    // }),
);