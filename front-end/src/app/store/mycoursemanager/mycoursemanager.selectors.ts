import { createSelector } from "@ngrx/store";
import { Course } from "../../models/Course";
import { AppState } from "../reducer";



export const selectMyCourseManager = (state: AppState) => state.myCourseManager;

export const selectCourseManagerFromId = (_id: String) => createSelector(
  selectMyCourseManager,
  (myCourseManager: Course[]): Course | undefined => {
    return myCourseManager.find(c => c._id === _id);
  }
);

export const selectCourseManagerWithName = (name: string) => createSelector(
  selectMyCourseManager,
  (myCourseManager: Course[]): Course[] => {
    return myCourseManager.filter(c => c.course_name.toLowerCase().includes(name.toLowerCase()));
  }
)