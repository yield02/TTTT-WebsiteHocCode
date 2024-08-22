import { createReducer, on } from '@ngrx/store';
import { Update, Delete } from './user.actions';
import { AuthUser, User } from '../../models/User';

export const initialState: AuthUser = {
    _id: '',
    user_id: 0,
    username: '',
    email: {
        data: '',
        verify: false,
        hidden: false,
    },
    fullname: '',
    role: [],
    gender: false,
    phone: {
        data: '',
        verify: false,
        hidden: false,
    },
    address: '',
    status: {},
}

export const userReducer = createReducer(
    initialState,
    on(Update, (state, { updateValue }) => {
        // console.log(updateValue);
        return { ...state, ...updateValue };
    }),
    on(Delete, (state) => {
        return initialState;
    }),
);