import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../../models/Lesson';


export const manager_loadCourses = createAction('[Course Manager Component] Load Courses');
export const manager_updateStatusCourses = createAction('[Course Manager Component] Update Status', props<{ course_ids: string[], status: "waiting" | "active" | "banned", reason?: string }>());
export const manager_deleteCourses = createAction('[Course Manager Component] Delete Course', props<{ ids: string[] }>());

export const manager_loadLessons = createAction('[Course Manager Component] Load Lessons');
export const manager_loadLessonsSuccess = createAction('[Course Manager Component] Load Lessons Success', props<{ lessons: Lesson[] }>());

export const manager_loadCoursesSuccess = createAction('[Course Manager Component] Load Courses Success', props<{ courses: any[] }>());
export const updateStatusCoursesSuccess = createAction('[Course Manager Component] Update Status Success', props<{ course_ids: string[], status: "waiting" | "active" | "banned", reason?: string }>());
export const deleteCourseSuccess = createAction('[Course Manager Component] Delete Course Success', props<{ ids: string[] }>());