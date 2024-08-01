import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/User';
import { fetchUsersSuccess } from './users.actions';

export const initialState: User[] = [];

export const usersReducer = createReducer(
    initialState,
    on(fetchUsersSuccess, (state, { users }) => {
        return [...state, ...users];
    })
);