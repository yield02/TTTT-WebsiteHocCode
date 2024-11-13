import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { User } from '../../../models/User';
import { addUsers, deleteUsersSucess, updateAdminRoleUsersSuccess, updateStatusUsersSuccess } from './users.actions';

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
    on(updateStatusUsersSuccess, (state, { user_ids, status, reason, date }) => {
        return state.map(user => user_ids.includes(user._id! as string) ? { ...user, status: { status, reason, date } } : user);
    }),
    on(deleteUsersSucess, (state, { ids }) => {
        return state.filter(user => !ids.includes(user._id! as string));
    }),
    on(updateAdminRoleUsersSuccess, (state, { user_ids, role }) => {
        return state.map(user => user_ids.includes(user._id! as string) ? { ...user, role } : user);
    })
);