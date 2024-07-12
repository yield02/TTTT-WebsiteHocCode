import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/Course';

export const Create = createAction('[Course Component] Create', props<{ course: Course }>());
export const Update = createAction('[Course Component] Update', props<{ updateValue: any }>());
export const Delete = createAction('[Course Component] Delete');

