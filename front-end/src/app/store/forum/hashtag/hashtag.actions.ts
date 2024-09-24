
import { createAction, props } from '@ngrx/store';
import { Hashtag } from '../../../models/forum/Hashtag';


export const loadHashtag = createAction('[Forum Hashtag] Load Hashtag');

export const addHashtags = createAction('[Add Hashtags] Add Hashtags', props<{ hashtags: Hashtag[] }>());