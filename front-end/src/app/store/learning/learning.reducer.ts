import { createReducer, on } from '@ngrx/store';
import { AuthUser, User } from '../../models/User';
import { LearningInterFace } from '../../models/Learning';
import { addAllLearning, addLearning, updateLearing } from './learning.actions';

export const initialState: { [key: string]: LearningInterFace } = {};

export const learingReducer = createReducer(
    initialState,
    on(addLearning, (state, { course_id, learning }) => {
        if (state[course_id.toString()]) {
            return state;
        }
        return {
            ...state,
            [course_id.toString()]: learning,
        }
    }),
    on(updateLearing, (state, { course_id, learning }) => {
        if (state[course_id.toString()]) {
            return {
                ...state,
                [course_id.toString()]: {
                    ...state[course_id.toString()],
                    ...learning,
                },
            };
        }
        return {
            ...state,
            [course_id.toString()]: learning,
        }
    }),
    on(addAllLearning, (state, { learnings }) => {

        let result: { [key: string]: LearningInterFace } = {};
        learnings.forEach(learning => {
            result[learning.course_id.toString()] = learning;
        });
        return result;
    })
);