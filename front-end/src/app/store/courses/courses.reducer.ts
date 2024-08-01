import { createReducer, on } from '@ngrx/store';
import { Create, Update, Delete, FetchingCoursesSucess, UserEnrollCourseSucess } from './courses.actions';
import { Course } from '../../models/Course';

export const initialState: Course[] = []

export const coursesReducer = createReducer(
    initialState,
    on(FetchingCoursesSucess, (state, { courses }) => {
        return [...state, ...courses];
    }),
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
    on(UserEnrollCourseSucess, (state, { course }) => {
        return state.map((item) => {
            if (item._id === course._id) {
                return course;
            }
            return item
        });
    })
);