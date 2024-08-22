import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/User';
import { fetchUsersSuccess } from './users.actions';

export const initialState: User[] = [];

export const usersReducer = createReducer(
    initialState,
    on(fetchUsersSuccess, (state, { users }) => {

        if (state.length == 0) {
            return [...state, ...users];
        }

        const newState = [...state];
        // Check if user is already in state
        users.forEach((user) => {
            if (!state.find((u) => u._id == user._id)) {
                newState.push(user);
            };
        });

        return newState;
    })
);