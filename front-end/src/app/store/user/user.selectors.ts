import { createSelector, select } from "@ngrx/store";
import { Course } from "../../models/Course";
import { AppState } from "../reducer";
import { User } from "../../models/User";



export const selectUser = (state: AppState) => state.user;


