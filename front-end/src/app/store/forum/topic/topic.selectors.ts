import { createSelector } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Topic } from "../../../models/forum/Topic";

export const selectLearningState = (state: AppState) => state.topic;

export const selectTopics = createSelector(
    selectLearningState,
    (state): { [key: string]: Topic[] } => {
        let topics: { [key: string]: Topic[] } = {};

        state.forEach((topic) => {
            if (!topics[topic.type]) {
                topics[topic.type] = [];
            }
            topics[topic.type].push(topic);
        });
        return topics;
    }
)
