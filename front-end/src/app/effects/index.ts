import { AuthService } from "../services/auth.service";
import { AdminCommentEffects } from "./admin/admin-comment.effects";
import { AdminCourseEffects } from "./admin/admin-course.effects";
import { AdminPostEffects } from "./admin/admin-post.effects";
import { AdminReportEffects } from "./admin/admin-report.effects";
import { AdminUserEffects } from "./admin/admin-user.effects";
import { AuthEffects } from "./auth.effects";
import { ChapterEffects } from "./chapter.effects"
import { CoursesManagerEffects } from "./course-manager.effects";
import { CourseEffects } from "./course.effect";
import { DiscussEffects } from "./discuss.effects";
import { ExerciseEffects } from "./exercise.effects";
import { CommentEffects } from "./forum/comment.effects";
import { HashtagEffects } from "./forum/hashtag.effects";
import { PostEffects } from "./forum/post.effects";
import { TopicEffects } from "./forum/topic.effects";
import { LearningEffects } from "./learning.effects";
import { LessonEffects } from "./lesson.effects";
import { QuesionEffects } from "./question.effects";
import { RatingEffects } from "./rating.effects";
import { ReplyDiscussEffects } from "./reply-discuss.effects";
import { SubjectEffects } from "./subject.effects";
import { UsersEffects } from "./users.effects";


const effects: Array<any> = [
    ChapterEffects,
    LessonEffects,
    SubjectEffects,
    CourseEffects,
    UsersEffects,
    CoursesManagerEffects,
    DiscussEffects,
    ReplyDiscussEffects,
    RatingEffects,
    LearningEffects,
    TopicEffects,
    HashtagEffects,
    PostEffects,
    CommentEffects,
    QuesionEffects,
    ExerciseEffects,
    AuthEffects,
    AdminCommentEffects,
    AdminUserEffects,
    AdminReportEffects,
    AdminPostEffects,
    AdminCourseEffects,
];

export default effects;