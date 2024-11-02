import { createReducer, on } from '@ngrx/store';
import { AddAllLessons, CreateLessonSucess, DeleteAllLessons, DeleteLessons, DeleteLessonSucess, FetchingLessonSucess, UpdateLessonsSuccess, UpdateLessonSuccess } from './lessons.actions';
import { Lesson } from '../../models/Lesson';
import { state } from '@angular/animations';

export const initialState: Lesson[] = []

export const lessonsReducer = createReducer(
    initialState,
    on(CreateLessonSucess, (state, { lesson }) => {
        return [...state, lesson]
    }),
    on(FetchingLessonSucess, (state, { lessons }) => {
        return [...state, ...lessons]
    }),
    on(UpdateLessonSuccess, (state, { lesson }) => {
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
    }),
    on(UpdateLessonsSuccess, (state, { lessons }) => {


        return state.map(item => {
            const index = lessons.findIndex(lesson => lesson._id === item._id);
            if (index >= 0) {
                return { ...item, ...lessons[index] };
            }
            return item;
        })
    }),
    on(AddAllLessons, (state, { lessons }) => {
        return lessons;
    })
);