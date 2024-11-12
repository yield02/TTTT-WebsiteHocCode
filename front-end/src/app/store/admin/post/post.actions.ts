import { createAction, props } from '@ngrx/store';
import { Post } from '../../../models/forum/Post';


export const manager_loadPosts = createAction('[Post Manager Component] Load Posts');
export const manager_updateStatusPost = createAction('[Post Manager Component] Update Status', props<{ post_ids: string[], status: "waiting" | "allow" | "block", reason?: string }>());
export const manager_deletePosts = createAction('[Post Manager Component] Delete Posts', props<{ ids: string[] }>());

export const addPosts = createAction('[Post Manager Component] Add Posts', props<{ posts: Post[] }>());
export const updateStatusPostSuccess = createAction('[Post Manager Component] Update Status Success', props<{ post_ids: string[], status: "waiting" | "allow" | "block", reason?: string }>());
export const deletePostSucess = createAction('[Post Manager Component] Delete Success', props<{ ids: string[] }>());