import { createAction, props } from '@ngrx/store';
import { Comment } from '../../../models/forum/Comment';

export const createComment = createAction('[Forum Comment] Create Comment', props<{ comment: Comment, reply_id?: string }>());
export const getCommentsByPostId = createAction('[Forum Comment] Get Comments', props<{ post_id: string }>());
export const deleteComment = createAction('[Forum Comment] Delete Comment', props<{ comment_id: string, reply_id?: string }>());
export const updateContentComment = createAction('[Forum Comment] Update Content Comment', props<{ comment: Comment }>());
export const interactWithComment = createAction('[Forum Comment] Interact With Comment', props<{ comment_id: string }>());


export const deleteCommentSuccess = createAction('[Forum Comment] Delete Comment Success', props<{ comment_id: string, reply_id?: string }>());
export const addComments = createAction('[Forum Comment] Add Comments', props<{ comments: Comment[] }>());
export const addComment = createAction('[Forum Comment] Add Comment', props<{ comment: Comment, reply_id?: string }>());
export const updateContentCommentSuccess = createAction('[Forum Comment] Update Content Comment Success', props<{ comment: Comment }>());
export const interactWithCommentSuccess = createAction('[Forum Comment] Interact With Comment Success', props<{ comment: Comment }>());