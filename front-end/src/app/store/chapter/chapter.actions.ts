import { createAction, props } from '@ngrx/store';
import { Chapter } from '../../models/Chapter';

export const Create = createAction('[Chapter Component] Create', props<{ chapter: Chapter }>());
export const Update = createAction('[Chapter Component] Update', props<{ updateValue: any }>());
export const Delete = createAction('[Chapter Component] Delete');