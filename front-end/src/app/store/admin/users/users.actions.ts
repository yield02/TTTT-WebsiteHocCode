import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/User';


export const manager_loadUsers = createAction('[User Manager Component] Load Users');
export const manager_updateStatusUsers = createAction('[User Manager Component] Update Status', props<{ user_ids: string[], status: "allow" | "block", reason?: string, date?: number }>());
export const manager_deleteUsers = createAction('[User Manager Component] Delete Users', props<{ ids: string[] }>());
export const manager_updateAdminRoleUsers = createAction('[User Manager Component] Update Admin Role Users', props<{ user_ids: string[], state: "admin" | "member" }>());


export const addUsers = createAction('[User Manager Component] Add Users', props<{ users: User[] }>());
export const updateStatusUsersSuccess = createAction('[User Manager Component] Update Status Users Success', props<{ user_ids: string[], status: "allow" | "block", reason?: string, date?: number }>());
export const deleteUsersSucess = createAction('[User Manager Component] Delete Users Success', props<{ ids: string[] }>());
export const updateAdminRoleUsersSuccess = createAction('[User Manager Component] Update Admin Role Users Success', props<{ user_ids: string[], role: "admin" | "member" }>());