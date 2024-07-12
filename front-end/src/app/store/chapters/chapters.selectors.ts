import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Chapter } from "../../models/Chapter";
import { Course } from "../../models/Course";


export const selectChapters = (state: AppState): Chapter[] => state.chapters;
export const selectCourseManager = (state: AppState): Course[] => state.myCourseManager;


export const selectChaptersFromId = (course_id: String) => createSelector(
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
