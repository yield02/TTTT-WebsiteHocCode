
import { Chapter } from '../models/Chapter';
import { Course } from '../models/Course';
import { Lesson } from '../models/Lesson';
import { Subject } from '../models/Subject';
import { User } from '../models/User';
import { chaptersReducer } from './chapters/chapters.reducer';
import { coursesReducer } from './courses/courses.reducer';
import { lessonsReducer } from './lessons/lessons.reducer';
import { myCourseManagerReducer } from './mycoursemanager/mycoursemanager.reducer';
import { subjectsReducer } from './subjects/subjects.reducer';
import { userReducer } from './user/user.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { usersReducer } from './users/users.reducer';

export interface AppState {
    user: User,
    courses: Course[],
    myCourseManager: Course[],
    chapters: Chapter[],
    lessons: Lesson[],
    subjects: Subject[],
    users: User[],
}


const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    courses: coursesReducer,
    myCourseManager: myCourseManagerReducer,
    chapters: chaptersReducer,
    lessons: lessonsReducer,
    subjects: subjectsReducer,
    users: usersReducer,
}

export default reducers;