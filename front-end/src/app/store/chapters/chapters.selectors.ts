import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Chapter } from "../../models/Chapter";
import { Course } from "../../models/Course";


export const selectChapters = (state: AppState): Chapter[] => state.chapters;
export const selectCourseManager = (state: AppState): Course[] => state.myCourseManager;
export const selectCourses = (state: AppState): Course[] => state.courses;

export const selectChaptersMangerFromCourseId = (course_id: String) => createSelector(
    selectChapters,
    selectCourseManager,
    (chapters: Chapter[], CourseManager: Course[]): Chapter[] => {
        const course = CourseManager.find((c: Course) => c._id === course_id);
        if (course) {
            return chapters.filter((c: Chapter) => course!.chapters!.includes(c._id))
        }
        return []

    }
);

export const selectChaptersFromCourseId = (course_id: String) => createSelector(
    selectChapters,
    selectCourses,
    (chapters: Chapter[], courses: Course[]): Chapter[] => {
        const course = courses.find((c: Course) => c._id === course_id);
        if (course) {
            return chapters.filter((c: Chapter) => course!.chapters!.includes(c._id))
        }
        return []

    }
);

export const selectChaptersFromIds = (chapters_id: String[]) => createSelector(
    selectChapters,
    (chapters: Chapter[]): Chapter[] => chapters.filter((c: Chapter) => chapters_id.includes(c._id))
);

export const selectChapterFromId = (chapters_id: String) => createSelector(
    selectChapters,
    (chapters: Chapter[]): Chapter | undefined => chapters.find((c: Chapter) => c._id === chapters_id)
);