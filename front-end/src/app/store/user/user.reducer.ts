import { createReducer, on } from '@ngrx/store';
import { Update, Delete } from './user.actions';
import { User } from '../../models/User';

export const initialState: User = {
    _id: '',
    user_id: 0,
    username: '',
    email: '',
    fullname: '',
    role: [],
    gender: false,
    phone: '',
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