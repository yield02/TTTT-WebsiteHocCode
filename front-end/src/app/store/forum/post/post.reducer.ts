import { createReducer, on } from '@ngrx/store';
import { Post } from '../../../models/forum/Post';
import { addPost } from './post.actions';



const initialState: Post[] = [];

export const postReducer = createReducer(
    initialState,
    on(addPost, (state, { post }) => {
        return [...state, post];
    })
);