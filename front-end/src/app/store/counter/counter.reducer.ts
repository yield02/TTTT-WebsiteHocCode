import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = {
    count: 0
};

export const counterReducer = createReducer(
    initialState,
    on(increment, (state) => ({ count: state.count + 1 })),
    on(decrement, (state) => ({ count: state.count - 1 })),
    on(reset, (state) => ({ count: 0 }))
);