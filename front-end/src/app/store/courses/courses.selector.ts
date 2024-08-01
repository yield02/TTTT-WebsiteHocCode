import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Course } from "../../models/Course";



const selectCoursesState = (state: AppState) => state.courses;
const selectUserState = (state: AppState) => state.user;

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
)