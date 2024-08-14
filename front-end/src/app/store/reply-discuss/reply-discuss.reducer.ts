import { createReducer, on } from '@ngrx/store';
import { Discuss } from '../../models/Discuss';
import { AddReplyDiscuss, DeleteReplyDiscussSucess, UpdateReplyDiscussSucess } from './reply-discuss.actions';
import { ReplyDiscuss } from '../../models/ReplyDiscuss';

export const initialState: ReplyDiscuss[] = [];

export const replyDiscussReducer = createReducer(
    initialState,
    on(AddReplyDiscuss, (state, { replyDiscucsses }) => [...state, ...replyDiscucsses]),
    on(UpdateReplyDiscussSucess, (state, { replyDiscuss }) => state.map(item => {
        if (item._id === replyDiscuss._id) {
            return replyDiscuss;
        }
        return item;
    })),
    on(DeleteReplyDiscussSucess, (state, { replyDiscussId, discuss_id }) => {
        return state.filter(item => item._id !== replyDiscussId);
    }),

);