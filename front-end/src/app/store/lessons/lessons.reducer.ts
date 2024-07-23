import { createReducer, on } from '@ngrx/store';
import { CreateLessonSucess, DeleteAllLessons, DeleteLessons, DeleteLessonSucess, FetchingLessonSucess, UpdateLessonSucess } from './lessons.actions';
import { Lesson } from '../../models/Lesson';

export const initialState: Lesson[] = []

export const lessonsReducer = createReducer(
    initialState,
    on(CreateLessonSucess, (state, { lesson }) => {
        return [...state, lesson]
    }),
    on(FetchingLessonSucess, (state, { lessons }) => {
        return [...state, ...lessons]
    }),
    on(UpdateLessonSucess, (state, { lesson }) => {
        return [...state.map(item => {
            if (item._id === lesson._id) {
                return { ...item, ...lesson };
            }
            return item;
        })]
    }),
    on(DeleteLessonSucess, (state, { lesson_id }) => {
        return state.filter(item => item._id !== lesson_id);
    }),
    on(DeleteLessons, (state, { lessons_id }) => {
        return state.filter(item => !lessons_id.includes(item._id));
    }),
    on(DeleteAllLessons, (state) => {
        return [];
    })
);