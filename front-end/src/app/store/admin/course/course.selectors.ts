import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";




export const selectUser = (state: AppState) => state.user;


