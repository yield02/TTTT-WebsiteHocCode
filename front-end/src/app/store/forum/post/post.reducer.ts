import { createReducer, on } from '@ngrx/store';
import { Post } from '../../../models/forum/Post';
import { addPost, addPosts, removePost, updatePost } from './post.actions';



const initialState: Post[] = [];

export const postReducer = createReducer(
    initialState,
    on(addPost, (state, { post }) => {
        return [...state, post];
    }),
    on(updatePost, (state, { post }) => {
        return state.map(p => p._id === post._id ? post : p);
    }),
    on(removePost, (state, { post_id }) => {
        return state.filter(p => p.post_id !== post_id);
    }),
    on(addPosts, (state, { posts }) => {
        return posts.reduce((acc, post) => {
            if (!acc.find(p => p._id === post._id)) {
                acc.push(post);
            }
            return acc;
        }, [...state]);
    })
);