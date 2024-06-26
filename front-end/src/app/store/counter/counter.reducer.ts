import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
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

export const counterReducer = createReducer(
    initialState,
    // on(increment, (state) => ({ count: state.count + 1 })),
    // on(decrement, (state) => ({ count: state.count - 1 })),
    // on(reset, (state) => ({ count: 0 }))
);