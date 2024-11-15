import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Course } from '../../../models/Course';
import { deleteCourseSuccess, manager_loadCoursesSuccess, updateStatusCoursesSuccess } from './course.actions';

export const initialState: Course[] = [];




export const admin_CourseReducer = createReducer(
    initialState,
    on(manager_loadCoursesSuccess, (state, { courses }) => {
        return courses;
    }),
    on(updateStatusCoursesSuccess, (state, { course_ids, status, reason }) => {
        return state.map(course => {
            if (course_ids.includes(course._id as string)) {
                return {
                    ...course, status: {
                        state: status,
                        reason: reason
                    }
                };
            }
            return course;
        });
    }),
    on(deleteCourseSuccess, (state, { ids }) => {
        return state.filter(course => !ids.includes(course._id as string));
    })
);