import { createReducer, on } from '@ngrx/store';
import { Create, Add, AddChapter, UpdateCourseManager, DeleteCourseManager } from './mycoursemanager.actions';
import { Course } from '../../models/Course';



export const initialState: Course[] = []

export const myCourseManagerReducer = createReducer(
    initialState,
    on(Create, (state, { course }) => {
        return state
    }),
    on(Add, (state, { courses }) => {
        return [...state, ...courses];
    }),
    on(UpdateCourseManager, (state, { course }) => {
        return state.map((item) => {
            if (item._id === course._id) {
                return course;
            }
            return item;
        });
    }),
    on(DeleteCourseManager, (state, { course_id }) => {
        return state.filter((item) => item._id !== course_id);
    }),
    on(AddChapter, (state, { course_id, chapter_id }) => {
        return [...state.map(item => {
            if (item._id === course_id) {
                return {
                    ...item,
                    chapters: [...(item.chapters || []), chapter_id]
                }
            }
            return item;
        })]
    }),
);