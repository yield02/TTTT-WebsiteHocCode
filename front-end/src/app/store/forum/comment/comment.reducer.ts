import { createReducer, on } from '@ngrx/store';
import { addComment, addComments, deleteCommentSuccess, interactWithCommentSuccess, updateContentCommentSuccess } from './comment.actions';
import { Comment } from '../../../models/forum/Comment';



const initialState: Comment[] = [];

export const commentReducer = createReducer(
    initialState,
    on(addComment, (state, { comment, reply_id }) => {
        let newState: Comment[] = state;
        newState = [comment, ...newState]
        if (reply_id) {
            newState = newState.map(item => item._id === reply_id ? {
                ...item,
                replies: [...(item.replies || []), comment._id!]
            } : item);
        }

        return newState;
    }),
    on(addComments, (state, { comments }) => {
        const newComments = comments.filter(comment => !state.some(existingComment => existingComment._id === comment._id));
        return [...state, ...newComments];
    }),

    on(deleteCommentSuccess, (state, { comment_id, reply_id }) => {
        let newState = state;
        if (reply_id) {
            newState = newState.map(item => item._id === reply_id ? {
                ...item,
                replies: item.replies!.filter(reply => reply !== comment_id)
            } : item);
        }
        return newState.filter(item => item._id != comment_id)
    }),

    on(updateContentCommentSuccess, (state, { comment }) => {
        return state.map(item => item._id === comment._id ? comment : item);
    }),

    on(interactWithCommentSuccess, (state, { comment }) => {
        return state.map(item => item._id === comment._id ? comment : item);
    })


);