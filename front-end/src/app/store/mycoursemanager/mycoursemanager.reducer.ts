import { createReducer, on } from '@ngrx/store';
import { Create, Update, Delete, Add, AddChapter } from './mycoursemanager.actions';
import { Course } from '../../models/Course';



export const initialState: Course[] = []

export const myCourseManagerReducer = createReducer(
    initialState,
    on(Create, (state, { course }) => {
        console.log(course);
        return state
    }),
    on(Add, (state, { courses }) => {
        return [...state, ...courses];
    }),
    on(Update, (state, { course }) => {
        return state.map((item) => {
            if (item._id === course._id) {
                return course;
            }
            return item;
        });
    }),
    on(Delete, (state) => {
        return initialState;
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