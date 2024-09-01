import { createAction, props } from '@ngrx/store';
import { LearningInterFace } from '../../models/Learning';


export const fetchLearning = createAction('[Learning Component] Fetch Learning', props<{ course_id: String }>());
export const updateAndCreateLearning = createAction('[Learning Component] Update and Create Learning', props<{ course_id: String, chapter_id: String, lesson_id: String, learning_id?: String }>());

export const addLearning = createAction('[Learning Component] Add Learning', props<{ course_id: String, learning: LearningInterFace }>());
export const updateLearing = createAction('[Learning Component] Update Learning', props<{ course_id: String, learning: LearningInterFace }>());