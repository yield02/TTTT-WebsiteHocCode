import { createAction, props } from '@ngrx/store';
import { Exercise } from '../../models/Exercise';






export const createExercise = createAction('[Exercise action] Create Exercise', props<{ exercise: Exercise }>());
export const updateExercise = createAction('[Exercise action] Update Exercise', props<{ exercise: Exercise }>());
export const getExercisesByChapterId = createAction('[Exercise action] Get Exercises By Chapter Id', props<{ chapterId: string }>());
export const createOrUpdateExercise = createAction('[Exercise action] Create Or Update Exercise', props<{ exercise: Exercise }>());





export const Add = createAction('[Exercise Store] Adds', props<{ exercises: Exercise[] }>());
export const Update = createAction('[Exercise Store] Update', props<{ exercise: Exercise }>());
export const InsertIfNotExists = createAction('[Exercise Store] Insert If Not Exists', props<{ exercise: Exercise }>());
export const Delete = createAction('[Exercise Store] Delete');