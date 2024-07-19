import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Course } from "../../models/Course";



const selectCoursesState = (state: AppState) => state.courses;


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