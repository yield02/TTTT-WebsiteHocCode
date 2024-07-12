import { createReducer, on } from '@ngrx/store';
import { CreateChapter, UpdateChapter, CreateChapterSuccess, FetchChapters, DeleteChapterSuccess, UpdateChapterSuccess } from './chapters.actions';
import { Chapter } from '../../models/Chapter';

export const initialState: Chapter[] = []

export const chaptersReducer = createReducer(
    initialState,
    // on(CreateChapter, (state, { chapter }) => {
    //     return [...state, chapter]
    // }),
    on(CreateChapterSuccess, (state, { chapter }) => {
        console.log('create sucess');
        return [...state, chapter]
    }),
    on(UpdateChapterSuccess, (state, { chapter_id, title }) => {
        return state.map(chapter => {
            if (chapter._id === chapter_id) {
                return { ...chapter, title };
            }
            return chapter;
        });
    }),
    on(FetchChapters, (state, { fetchValue }) => {
        return [...fetchValue];
    }),
    on(DeleteChapterSuccess, (state, { chapter_id }) => {
        return [...state.filter((chapter: Chapter) => chapter._id !== chapter_id)];
    }),
);