import { createAction, props } from '@ngrx/store';
import { Topic } from '../../../models/forum/Topic';


export const loadTopic = createAction('[Forum Topic] Load Topic');

export const addTopics = createAction('[Add Topics] Add Topics', props<{ topics: Topic[] }>());