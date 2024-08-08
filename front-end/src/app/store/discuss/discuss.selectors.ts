import { createSelector, select } from "@ngrx/store";
import { Course } from "../../models/Course";
import { AppState } from "../reducer";
import { User } from "../../models/User";
import { Discuss } from "../../models/Discuss";


const selectDisucsses = (state: AppState) => state.discuss;

export const selectDiscussFromLessonId = (lesson_id: String) => createSelector(
    selectDisucsses,
    (discuss: Discuss[]): Discuss[] => {
        return discuss.filter((c: Discuss) => c.lesson_id === lesson_id);
    })


