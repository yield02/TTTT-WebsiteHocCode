import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/Course';



export const FetchingCoursesFromSubjectIds = createAction('[Courses Component] fetching FromSubjectId', props<{ subject_ids: string[] }>());
export const FetchingCourseFromCourseId = createAction('[Courses Component] fetching FromCourseId', props<{ course_id: String }>());
export const FetchingCourseFromCourseIds = createAction('[Courses Component] fetching CourseIds', props<{ course_ids: String[] }>());

export const FetchingCoursesSucess = createAction('[CoursesSucess Component] fetching Sucess', props<{ courses: Course[] }>());

export const Create = createAction('[Courses Component] Create', props<{ course: Course }>());
export const Update = createAction('[Courses Component] Update', props<{ updateValue: any }>());
export const Delete = createAction('[Courses Component] Delete');

export const UserEnrollCourse = createAction('[Courses Component] UserEnrollCourse', props<{ course_id: String }>());
export const UserEnrollCourseSucess = createAction('[Courses Component] UserEnrollCourseSucess', props<{ course: Course }>());

