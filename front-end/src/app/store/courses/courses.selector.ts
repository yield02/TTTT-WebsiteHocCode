import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Course } from "../../models/Course";
import { Chapter } from "../../models/Chapter";
import { Lesson } from "../../models/Lesson";



const selectCoursesState = (state: AppState) => state.courses;
const selectUserState = (state: AppState) => state.user;

const selectChapterState = (state: AppState) => state.chapters;
const selectLessonState = (state: AppState) => state.lessons;

export const selectCoursesFromSubjectId = (subject_id: String) => createSelector(
    selectCoursesState,
    (courses: Course[]): Course[] => {
        return courses.filter((c: Course) => c.subject_id === subject_id);
    }
);

export const selectCourseFromCourseId = (course_id: String) => createSelector(
    selectCoursesState,
    (courses: Course[]): Course | undefined => {
        return courses.find((c: Course) => c._id === course_id);
    }
);

export const checkUserEnroll = (course_id: String) => createSelector(
    selectCoursesState,
    selectUserState,
    (courses: Course[], user): Boolean => {
        const course = courses.find(c => c._id === course_id);
        if (!course || !user) {
            return false;
        }
        if (course.enroll?.includes(user._id) || course.author_id === user._id) {
            return true;
        }
        else {
            return false;
        }
    }
);

export const selectFirstChapterAndLesson = (course_id: String) => createSelector(
    selectCoursesState,
    selectChapterState,
    selectLessonState,
    (courses: Course[], chapters: Chapter[], lessons: Lesson[]): { chapter: Chapter, lesson: Lesson } | undefined => {
        const course: Course | undefined = courses.find(c => c._id === course_id);
        if (!course) {
            return undefined;
        }
        const chapter = chapters.find(c => c._id === (course?.chapters && course.chapters[0]));
        if (!chapter) {
            return undefined;
        }
        const lesson = lessons.find(l => l._id === (chapter?.lessons && chapter.lessons[0]));
        if (!lesson) {
            return undefined;
        }
        return { chapter, lesson };
    }
);