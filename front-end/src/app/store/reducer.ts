
import { Chapter } from '../models/Chapter';
import { Course } from '../models/Course';
import { Lesson } from '../models/Lesson';
import { Subject } from '../models/Subject';
import { AuthUser, User } from '../models/User';
import { chaptersReducer } from './chapters/chapters.reducer';
import { coursesReducer } from './courses/courses.reducer';
import { lessonsReducer } from './lessons/lessons.reducer';
import { myCourseManagerReducer } from './mycoursemanager/mycoursemanager.reducer';
import { subjectsReducer } from './subjects/subjects.reducer';
import { userReducer } from './user/user.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { usersReducer } from './users/users.reducer';
import { Discuss } from '../models/Discuss';
import { discussReducer } from './discuss/discuss.reducer';
import { replyDiscussReducer } from './reply-discuss/reply-discuss.reducer';
import { ReplyDiscuss } from '../models/ReplyDiscuss';
import { RatingInterface } from '../models/Rating';
import { ratingReducer } from './rating/rating.reducer';
import { LearningInterFace } from '../models/Learning';
import { learingReducer } from './learning/learning.reducer';
import { Topic } from '../models/forum/Topic';
import { topicReducer } from './forum/topic/topic.reducer';
import { Hashtag } from '../models/forum/Hashtag';
import { hashtagReducer } from './forum/hashtag/hashtag.reducer';
import { Post } from '../models/forum/Post';
import { postReducer } from './forum/post/post.reducer';
import { Comment } from '../models/forum/Comment';
import { commentReducer } from './forum/comment/comment.reducer';
import { Question } from '../models/Question';
import { questionReducer } from './question/question.reducer';
import { Exercise } from '../models/Exercise';
import { exerciseReducer } from './exercise/exercise.reducer';
import { admin_UsersReducer } from './admin/users/users.reducer';
import { admin_CourseReducer } from './admin/course/course.reducer';
import { admin_CommentReducer } from './admin/comment/comment.reducer';
import { admin_PostReducer } from './admin/post/post.reducer';
import { admin_ReportReducer } from './admin/report/report.reducer';
import { Report } from '../models/Report';

export interface AppState {
    user: AuthUser,
    courses: Course[],
    myCourseManager: Course[],
    chapters: Chapter[],
    lessons: Lesson[],
    subjects: Subject[],
    users: User[],
    discuss: Discuss[],
    replyDiscuss: ReplyDiscuss[],
    rating: RatingInterface[],
    learning: { [key: string]: LearningInterFace },
    topic: Topic[],
    hashtag: Hashtag[],
    post: Post[],
    comment: Comment[],
    question: Question[],
    exercise: Exercise[],
    admin_user: User[],
    admin_report: Report[],
    admin_course: Course[],
    admin_post: Post[],
    admin_comment: Comment[],
}


const reducers: ActionReducerMap<AppState> = {
    user: userReducer,
    courses: coursesReducer,
    myCourseManager: myCourseManagerReducer,
    chapters: chaptersReducer,
    lessons: lessonsReducer,
    subjects: subjectsReducer,
    users: usersReducer,
    discuss: discussReducer,
    replyDiscuss: replyDiscussReducer,
    rating: ratingReducer,
    learning: learingReducer,
    topic: topicReducer,
    hashtag: hashtagReducer,
    post: postReducer,
    comment: commentReducer,
    question: questionReducer,
    exercise: exerciseReducer,
    admin_user: admin_UsersReducer,
    admin_report: admin_ReportReducer,
    admin_course: admin_CourseReducer,
    admin_post: admin_PostReducer,
    admin_comment: admin_CommentReducer,
}

export default reducers;