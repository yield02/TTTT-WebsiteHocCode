import { Chapter } from '../models/Chapter';
import { Course } from '../models/Course';
import { User } from '../models/User';
import { chaptersReducer } from './chapters/chapters.reducer';
import { courseReducer } from './course/course.reducer';
import { myCourseManagerReducer } from './mycoursemanager/mycoursemanager.reducer';
import { userReducer } from './user/user.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    user: User,
    course: Course,
    myCourseManager: Course[],
    chapters: Chapter[],
}


const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    course: courseReducer,
    myCourseManager: myCourseManagerReducer,
    chapters: chaptersReducer,
}

export default reducers;