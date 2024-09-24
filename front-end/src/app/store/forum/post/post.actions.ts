import { createAction, props } from '@ngrx/store';
import { Post } from '../../../models/forum/Post';

export const loadPost = createAction('[Forum Post] Load Post');

export const createPost = createAction('[Forum Post] Create Post', props<{ post: Post }>());

export const addPost = createAction('[Forum Post] Add Post', props<{ post: Post }>());
