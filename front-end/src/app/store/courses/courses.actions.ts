import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/Course';



export const FetchingCoursesFromSubject = createAction('[Courses Component] fetching FromSubjectId', props<{ subject_id: String }>());
export const FetchingCourseFromCourseId = createAction('[Courses Component] fetching FromCourseId', props<{ course_id: String }>());
export const FetchingCoursesSucess = createAction('[CoursesSucess Component] fetching Sucess', props<{ courses: Course[] }>());

export const Create = createAction('[Courses Component] Create', props<{ course: Course }>());
export const Update = createAction('[Courses Component] Update', props<{ updateValue: any }>());
export const Delete = createAction('[Courses Component] Delete');

