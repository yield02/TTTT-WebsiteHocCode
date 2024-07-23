import { createAction, props } from '@ngrx/store';
import { CreateLessonInterface, Lesson, UpdateLessonInterface } from '../../models/Lesson';


export const CreateLesson = createAction('[Lessons Component] Create', props<{ createLesson: CreateLessonInterface }>());
export const CreateLessonSucess = createAction('[Lessons Component] createSucess', props<{ lesson: Lesson }>());

export const FetchingLessons = createAction('[Lessons Component] fetchingLesson', props<{ chapter_id: String }>());
export const FetchingLessonSucess = createAction('[Lessons Component] fetchingLessonSucess', props<{ lessons: Lesson[] }>())

export const UpdateLesson = createAction('[Lessons Component] updateLesson', props<{ lesson: UpdateLessonInterface }>());
export const UpdateLessonSucess = createAction('[Lessons Component] updateLessonSucess', props<{ lesson: Lesson }>());

export const DeleteLesson = createAction('[Lessons Component] deleteLesson', props<{ chapter_id: String, lesson_id: String }>());
export const DeleteLessonSucess = createAction('[Lessons Component] deleteLessonSucess', props<{ lesson_id: String }>());

export const DeleteLessons = createAction('[Lessons Component] deleteLessons', props<{ lessons_id: String[] }>());

export const DeleteAllLessons = createAction('[Lessons Component] deleteAllLessons');