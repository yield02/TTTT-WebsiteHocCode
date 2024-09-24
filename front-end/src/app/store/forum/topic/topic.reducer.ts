import { createReducer, on } from '@ngrx/store';
import { Topic } from '../../../models/forum/Topic';
import { addTopics } from './topic.actions';



const initialState: Topic[] = [];

export const topicReducer = createReducer(
    initialState,
    on(addTopics, (state, { topics }) => {
        return topics;
    })
);