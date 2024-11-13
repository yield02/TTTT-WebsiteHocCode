import { createReducer, on } from '@ngrx/store';
import { Comment } from '../../../models/forum/Comment';
import { addComments, deleteCommentsSucess, updateStatusCommentsSuccess } from './comment.actions';

export const initialState: Comment[] = [];

export const admin_CommentReducer = createReducer(
    initialState,
    on(addComments, (state, { comments }) => {
        return comments.reduce((acc, comment) => {
            if (!state.some(existingComment => existingComment._id === comment._id)) {
                acc.push(comment);
            }
            return acc;
        }, [...state]);
    }),
    on(updateStatusCommentsSuccess, (state, { comment_ids, status, reason }) => {
        return state.map(comment => comment_ids.includes(comment._id!) ? { ...comment, status, reason } : comment);
    }),
    on(deleteCommentsSucess, (state, { ids }) => {
        return state.filter(comment => !ids.includes(comment._id!));
    })
);