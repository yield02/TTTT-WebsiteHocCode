import { createAction, props } from '@ngrx/store';
import { Subject } from '../../models/Subject';

export const fetchingSubjects = createAction('[Subjects Component] Fetching Subjects');
export const fetchingSubjectsSuccess = createAction('[Subjects Component] Fetching Subjects Success', props<{ subjects: Subject[] }>());
