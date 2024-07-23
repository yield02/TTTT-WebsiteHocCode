import { createSelector } from "@ngrx/store";
import { Course } from "../../models/Course";
import { AppState } from "../reducer";



export const selectUserInfor = (state: AppState) => state.user;
export const selectCourses = (state: AppState) => state.courses;

