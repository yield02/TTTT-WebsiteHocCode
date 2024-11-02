import { createAction, props } from '@ngrx/store';
import { CreateLessonInterface, Lesson, UpdateLessonInterface } from '../../models/Lesson';


export const CreateLesson = createAction('[Lessons Component] Create', props<{ createLesson: CreateLessonInterface }>());
export const CreateLessonSucess = createAction('[Lessons Component] createSucess', props<{ lesson: Lesson }>());

export const FetchingLessons = createAction('[Lessons Component] fetchingLesson', props<{ chapter_id: String }>());
export const FetchingLessonsForAuthor = createAction('[Lessons Component] fetchingLessonForAuthor', props<{ chapter_id: String }>());
export const FetchingLessonsByCourseId = createAction('[Lessons Component] fetchingLessonByCourseId', props<{ course_id: String }>());
export const FetchingLessonSucess = createAction('[Lessons Component] fetchingLessonSucess', props<{ lessons: Lesson[] }>())
export const sortLesson = createAction('[Lessons Component] sortLesson', props<{ chapter_id: string, lessons_id: string[] }>());
export const ToggleUpdatePublish = createAction('[Lessons Component] toggleUpdatePublish', props<{ lessons_id: string[], state?: string }>());
export const CallAPIDeleteLessons = createAction('[Lessons Component] callAPIDeleteLessons', props<{ lessons_id: string[] }>());




export const UpdateLesson = createAction('[Lessons Component] updateLesson', props<{ lesson: UpdateLessonInterface }>());

export const UpdateLessonsSuccess = createAction('[Lessons Component] updateLessonsSuccess', props<{ lessons: Lesson[] }>());
export const UpdateLessonSuccess = createAction('[Lessons Component] updateLessonSucess', props<{ lesson: Lesson }>());

export const DeleteLesson = createAction('[Lessons Component] deleteLesson', props<{ chapter_id: String, lesson_id: String }>());
export const DeleteLessonSucess = createAction('[Lessons Component] deleteLessonSucess', props<{ lesson_id: String }>());

export const DeleteLessons = createAction('[Lessons Component] deleteLessons', props<{ lessons_id: String[] }>());

export const DeleteAllLessons = createAction('[Lessons Component] deleteAllLessons');

export const AddAllLessons = createAction('[Lessons Component] addAllLessons', props<{ lessons: Lesson[] }>());