import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';

export const Update = createAction('[User Component] Update', props<{ updateValue: any }>());
export const Delete = createAction('[User Component] Delete');