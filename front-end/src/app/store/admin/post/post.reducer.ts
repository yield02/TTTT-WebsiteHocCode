import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Post } from '../../../models/forum/Post';
import { addPosts, deletePostSucess, updateStatusPostSuccess } from './post.actions';

export const initialState: Post[] = [];

export const admin_PostReducer = createReducer(
    initialState,
    on(addPosts, (state, { posts }) => {
        return posts.reduce((acc, post) => {
            if (!state.some(existingPost => existingPost._id === post._id)) {
                acc.push(post);
            }
            return acc;
        }, [...state]);
    }),
    on(updateStatusPostSuccess, (state, { post_ids, status, reason }) => {
        return state.map(post => post_ids.includes(post._id!) ? { ...post, status, reason } : post);
    }),
    on(deletePostSucess, (state, { ids }) => {
        return state.filter(post => !ids.includes(post._id!));
    })
);