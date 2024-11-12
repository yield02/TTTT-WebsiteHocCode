import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/User';


export const manager_loadUsers = createAction('[User Manager Component] Load Users');



export const addUsers = createAction('[User Manager Component] Add Users', props<{ users: User[] }>());