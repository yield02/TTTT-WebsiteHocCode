import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/Course';
import { Filter } from '../../models/Filter';


export const FetchCourseManager = createAction('[mycoursemanager Component] FetchCourseManager', props<{ course_id: String }>());
// export const fetchCourseManagerSucess = createAction('[mycoursemanagerSucess Component] FetchCourseManagerSucess', props<{ course: Course }>());

export const Create = createAction('[mycoursemanager Component] Create', props<{ course: Course }>());
export const Add = createAction('[mycoursemanager Component] Add', props<{ courses: Course[] }>());
export const UpdateCourseManager = createAction('[mycoursemanager Component] Update', props<{ course: Course }>());
export const DeleteCourseManager = createAction('[mycoursemanager Component] Delete', props<{ course_id: String }>());


export const AddChapter = createAction('[mycoursemanager Component] AddChapter', props<{ course_id: String, chapter_id: String }>());
export const DeleteChapter = createAction('[mycoursemanager Component] DeleteChapter', props<{ course_id: String, chapter_id: String }>());

export const AcceptEnroll = createAction('[mycoursemanager Component] AcceptEnroll', props<{ course_id: String, enrolls_id: String[] }>());

export const RejectEnroll = createAction('[mycoursemanager Component] RejectEnroll', props<{ course_id: String, enrolls_id: String[] }>());

export const FindUserInCourseWithUserName = createAction('[mycoursemanager Component] FetchUsersWithUserName', props<{ username: String, course_id: String, typeList: 'enroll' | 'waiting_enroll' }>());

export const fetchUsersInCourse = createAction('[mycoursemanager Component] Fetch Users', props<{ course_id: String, filter: Filter, typeList: 'enroll' | 'waiting_enroll' }>());

export const DeleteUserEnrollFromAuth = createAction('[mycoursemanager Component] Delete User Enroll', props<{ course_id: String, users_id: String[] }>());
