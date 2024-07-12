import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/Course';

export const Create = createAction('[mycoursemanager Component] Create', props<{ course: Course }>());
export const Add = createAction('[mycoursemanager Component] Add', props<{ courses: Course[] }>());
export const Update = createAction('[mycoursemanager Component] Update', props<{ course: Course }>());
export const Delete = createAction('[mycoursemanager Component] Delete');


export const AddChapter = createAction('[mycoursemanager Component] AddChapter', props<{ course_id: String, chapter_id: String }>());
export const DeleteChapter = createAction('[mycoursemanager Component] DeleteChapter', props<{ course_id: String, chapter_id: String }>());