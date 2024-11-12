import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { User } from '../../../models/User';
import { addUsers } from './users.actions';

export const initialState: User[] = [];

export const admin_UsersReducer = createReducer(
    initialState,
    on(addUsers, (state, { users }) => {
        return users.reduce((acc, user) => {
            if (!state.some(existingUser => existingUser._id === user._id)) {
                acc.push(user);
            }
            return acc;
        }, [...state]);
    }),
);