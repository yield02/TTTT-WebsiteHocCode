import { createReducer, on } from '@ngrx/store';
import { Create, Update, Delete, FetchingCoursesSucess, UserEnrollCourseSucess } from './courses.actions';
import { Course } from '../../models/Course';

export const initialState: Course[] = []

export const coursesReducer = createReducer(
    initialState,
    on(FetchingCoursesSucess, (state, { courses }) => {
        const newCourses = courses.filter(course => !state.some(existingCourse => existingCourse._id === course._id));
        return [...state, ...newCourses];
    }),
    on(Create, (state, { course }) => {
        return state
    }),
    on(Update, (state, { updateValue }) => {
        return { ...state, ...updateValue };
    }),
    on(Delete, (state) => {
        return initialState;
    }),
    on(UserEnrollCourseSucess, (state, { course }) => {
        return state.map((item) => {
            if (item._id === course._id) {
                return {
                    ...item,
                    enroll: course.enroll
                }
            }
            return item
        });
    })
);