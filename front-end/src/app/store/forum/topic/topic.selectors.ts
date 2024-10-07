import { createSelector } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Topic } from "../../../models/forum/Topic";

export const selectTopicState = (state: AppState) => state.topic;

export const selectTopics = createSelector(
    selectTopicState,
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
);

export const selectTopic = (topic_id: string) => createSelector(
    selectTopicState,
    (state) => {
        return state.find((topic) => topic._id === topic_id)
    }
)
