import { createAction, props } from '@ngrx/store';
import { Comment } from '../../../models/forum/Comment';

export const manager_loadComments = createAction('[Comment Manager Component] Load Comments');
export const manager_updateStatusComments = createAction('[Comment Manager Component] Update Status', props<{ comment_ids: string[], status: "allow" | "block", reason?: string }>());
export const manager_deleteComments = createAction('[Comment Manager Component] Delete Comments', props<{ ids: string[] }>());

export const addComments = createAction('[Comment Manager Component] Add Comments', props<{ comments: Comment[] }>());
export const updateStatusCommentsSuccess = createAction('[Comment Manager Component] Update Status Comments Success', props<{ comment_ids: string[], status: "allow" | "block", reason?: string }>());
export const deleteCommentsSucess = createAction('[Comment Manager Component] Delete Comments Success', props<{ ids: string[] }>());