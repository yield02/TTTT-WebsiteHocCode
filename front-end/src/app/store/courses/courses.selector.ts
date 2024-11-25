import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Course } from "../../models/Course";
import { Chapter } from "../../models/Chapter";
import { Lesson } from "../../models/Lesson";
import * as lodash from "lodash";
import { AuthUser } from "../../models/User";


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
        if (course.enroll?.includes(user._id) || course.author_id?._id === user._id) {
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
    selectUserState,
    (courses: Course[], chapters: Chapter[], lessons: Lesson[], user: AuthUser): { chapter: Chapter, lesson: Lesson } | undefined => {
        const course: Course | undefined = courses.find(c => c._id === course_id);
        if (!course || !course.enroll?.includes(user._id) && course.author_id?._id !== user._id) {
            console.log('vo day');
            return undefined;
        }

        const chapter = chapters.find(c => c._id === (course?.chapters && course.chapters[0]));
        if (!chapter) {
            console.log("Chapter not found");
            return undefined;
        }
        const lesson = lessons.find(l => l._id === (chapter?.lessons && chapter.lessons[0]));
        if (!lesson) {
            console.log("Lesson not found");
            return undefined;
        }
        return { chapter, lesson };
    }
);

export const selectCoursesFromCourseId = (courseId: String[]) => createSelector(
    selectCoursesState,
    (courses: Course[]): Course[] | undefined => {
        return courses.filter(c => courseId.includes(c._id!));
    }
)

export interface FilterCourseHomePage {
    search: string,
    subject: string,
    filter: { type: 'asc' | 'desc', field: string }
}

export const selectCourseWithFilter = (filter: FilterCourseHomePage) => createSelector(selectCoursesState, (courses: Course[]) => {
    let coursesSort = courses.filter(c => c.course_name.toLowerCase().includes(filter.search.toLowerCase()) || filter.search === '' || filter.search === 'all');

    let coursesWithSubject = coursesSort.filter(c => c.subject_id === filter.subject || filter.subject === 'all');

    let result = lodash.orderBy(coursesWithSubject, filter.filter.field, filter.filter.type);
    return result;
})