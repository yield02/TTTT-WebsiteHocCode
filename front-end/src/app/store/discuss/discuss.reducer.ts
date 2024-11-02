import { createReducer, on } from '@ngrx/store';
import { Discuss } from '../../models/Discuss';
import { AddDiscuss, AddReplyDiscussToDiscuss, DeleteDiscussSuccess, DeleteReplyDiscussFromDiscuss, ReplaceAllDiscussions, UpdateDiscussSuccess } from './discuss.actions';
import { Update } from '../user/user.actions';

export const initialState: Discuss[] = [];

export const discussReducer = createReducer(
    initialState,
    on(AddDiscuss, (state, { discusses }) => [...discusses, ...state]),
    on(UpdateDiscussSuccess, (state, { discuss }) => state.map(item => {
        if (item._id === discuss._id) {
            return discuss;
        }
        return item;
    })),
    on(DeleteDiscussSuccess, (state, { discuss_id }) => state.filter(item => item._id !== discuss_id)),
    on(AddReplyDiscussToDiscuss, (state, { discuss_id, replyDiscuss_id }) => state.map((item: Discuss) => {
        if (item._id === discuss_id) {

            const replies: String[] = item.replies || [];

            return { ...item, replies: [replyDiscuss_id, ...replies] };
        }
        return item;
    })),
    on(DeleteReplyDiscussFromDiscuss, (state, { discuss_id, replyDiscuss_id }) => state.map((item: Discuss) => {
        if (item._id === discuss_id) {
            const replies: String[] = item.replies?.filter(reply => reply !== replyDiscuss_id) || [];
            return { ...item, replies: [...replies] };
        }
        return item;
    })),
    on(ReplaceAllDiscussions, (state, { discusses }) => {
        return [...discusses];
    })

);