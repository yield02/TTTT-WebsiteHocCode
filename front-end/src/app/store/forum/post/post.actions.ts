import { createAction, props } from '@ngrx/store';
import { Post } from '../../../models/forum/Post';

export const loadPost = createAction('[Forum Post] Load Post');
export const loadPostWithId = createAction('[Forum Post] Load Post With Id', props<{ id: string }>());
export const createPost = createAction('[Forum Post] Create Post', props<{ post: Post }>());
export const editContentPost = createAction('[Forum Post] Edit Content Post', props<{ post: Post }>());
export const deletePost = createAction('[Forum Post] Delete Post', props<{ post_id: number }>());



export const addPost = createAction('[Forum Post] Add Post', props<{ post: Post }>());
export const updatePost = createAction('[Forum Post] Update Post', props<{ post: Post }>());
export const removePost = createAction('[Forum Post] Remove Post', props<{ post_id: number }>());
