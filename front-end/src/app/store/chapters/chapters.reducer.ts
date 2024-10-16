import { createReducer, on } from '@ngrx/store';
import { CreateChapter, UpdateChapter, CreateChapterSuccess, DeleteChapterSuccess, UpdateChapterSuccess, ChapterCreateLesson, ChapterUpdateLesson, ChapterDeleteLesson, FetchChaptersSucess, SortDownLesson, SortUpLesson } from './chapters.actions';
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
    on(FetchChaptersSucess, (state, { fetchValue }) => {
        return [...fetchValue];
    }),
    on(DeleteChapterSuccess, (state, { chapter_id }) => {
        return [...state.filter((chapter: Chapter) => chapter._id !== chapter_id)];
    }),
    on(ChapterCreateLesson, (state, { chapter_id, lesson_id }) => {
        return state.map(chapter => {
            if (chapter._id === chapter_id) {
                return { ...chapter, lessons: [...chapter.lessons || [], lesson_id] };
            }
            return chapter;
        });
    }),
    on(ChapterUpdateLesson, (state, { old_chapter_id, new_chapter_id, lesson_id }) => {

        console.log(old_chapter_id, new_chapter_id);

        if (old_chapter_id == new_chapter_id) {
            return state;
        }
        else {
            return [...state.map((chapter: Chapter) => {
                if (chapter._id === old_chapter_id) {
                    return { ...chapter, lessons: chapter.lessons!.filter((id) => id !== lesson_id) };
                }
                if (chapter._id === new_chapter_id) {
                    return { ...chapter, lessons: [...(chapter.lessons || []), lesson_id] };
                }
                return chapter;
            })]
        }
    }),
    on(ChapterDeleteLesson, (state, { chapter_id, lesson_id }) => {
        return [...state.map((chapter) => {
            if (chapter._id === chapter_id) {
                return {
                    ...chapter,
                    lessons: chapter.lessons!.filter((id) => id !== lesson_id)
                };
            }
            return chapter;
        })]
    }),
    on(SortDownLesson, (state, { chapter_id, lesson_id }) => {

        return state.map((chapter) => {
            if (chapter._id === chapter_id) {
                const index = chapter.lessons!.findIndex((id) => id === lesson_id);
                if (index >= 0) {
                    const lessons = [...chapter.lessons || []];
                    lessons[index] = lessons[index + 1];
                    lessons[index + 1] = lesson_id;
                    return { ...chapter, lessons };
                }
            }
            return chapter;
        })

    }),
    on(SortUpLesson, (state, { chapter_id, lesson_id }) => {
        return state.map((chapter) => {
            if (chapter._id === chapter_id) {
                const index = chapter.lessons!.findIndex((id) => id === lesson_id);
                if (index > 0) {
                    const lessons = [...chapter.lessons || []];
                    lessons[index] = lessons[index - 1];
                    lessons[index - 1] = lesson_id;
                    return { ...chapter, lessons };
                }
            }
            return chapter;
        })
    }),
    on(UpdateChapter, (state, { chapter }) => {
        return state.map(item => item._id === chapter._id ? chapter : item);
    })
);