import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { LearningInterFace } from "../../models/Learning";



export const selectLearningState = (state: AppState) => state.learning;


export const selectLearningFromCourseId = (course_id: String) => createSelector(
    selectLearningState,
    (learning: { [key: string]: LearningInterFace }): LearningInterFace | undefined => {
        return learning[course_id.toString()];
    }
);

export const selectAllCourseOfLearning = createSelector(
    selectLearningState,
    (learning: { [key: string]: LearningInterFace }): String[] => {
        return Object.keys(learning);
    }
)
