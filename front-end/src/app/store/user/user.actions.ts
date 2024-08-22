import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../models/User';

export const Update = createAction('[User Component] Update', props<{ updateValue: AuthUser }>());
export const Delete = createAction('[User Component] Delete');