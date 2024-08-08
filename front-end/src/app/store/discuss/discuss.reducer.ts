import { createReducer, on } from '@ngrx/store';
import { Discuss } from '../../models/Discuss';
import { AddDiscuss, DeleteDiscussSuccess, UpdateDiscussSuccess } from './discuss.actions';
import { Update } from '../user/user.actions';

export const initialState: Discuss[] = [];

export const discussReducer = createReducer(
    initialState,
    on(AddDiscuss, (state, { discusses }) => [...state, ...discusses]),
    on(UpdateDiscussSuccess, (state, { discuss }) => state.map(item => {
        if (item._id === discuss._id) {
            return discuss;
        }
        return item;
    })),
    on(DeleteDiscussSuccess, (state, { discuss_id }) => state.filter(item => item._id !== discuss_id))
);