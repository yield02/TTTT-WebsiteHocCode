import { createReducer, on } from '@ngrx/store';
import { Create, Add, AddChapter, UpdateCourseManager, DeleteCourseManager, sortChapterUp, sortChapterDown } from './mycoursemanager.actions';
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
    on(sortChapterUp, (state, { course_id, chapter_id }) => {
        return state.map((course) => {
            if (course._id === course_id) {
                let chapters: String[] = [...course.chapters || []];
                const index = chapters.indexOf(chapter_id);
                if (index > 0) {
                    const prevIndex = index - 1;
                    chapters[index] = course.chapters![prevIndex];
                    chapters[prevIndex] = course.chapters![index];
                    return {
                        ...course,
                        chapters
                    }
                }
            }
            return course;
        })
    }),
    on(sortChapterDown, (state, { course_id, chapter_id }) => {
        return state.map((course) => {
            if (course._id === course_id) {
                let chapters: String[] = [...course.chapters || []];
                const index = chapters.indexOf(chapter_id);
                if (index >= 0) {
                    console.log('vo day');
                    const nextIndex = index + 1;
                    chapters[index] = course.chapters![nextIndex];
                    chapters[nextIndex] = course.chapters![index];
                    return {
                        ...course,
                        chapters
                    }
                }
            }
            return course;
        })
    })
);