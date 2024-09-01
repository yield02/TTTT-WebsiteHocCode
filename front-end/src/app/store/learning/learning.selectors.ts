import { createSelector, select } from "@ngrx/store";
import { Course } from "../../models/Course";
import { AppState } from "../reducer";
import { User } from "../../models/User";
import { LearningInterFace } from "../../models/Learning";



export const selectLearningState = (state: AppState) => state.learning;


export const selectLearningFromCourseId = (course_id: String) => createSelector(
    selectLearningState,
    (learning: { [key: string]: LearningInterFace }): LearningInterFace | undefined => {
        return learning[course_id.toString()];
    }
);
