import { CourseManagerComponent } from "../pages/myactivities/components/mycourses/courseManager/courseManager.component";
import { ChapterEffects } from "./chapter.effects"
import { CoursesManagerEffects } from "./course-manager.effects";
import { CourseEffects } from "./course.effect";
import { DiscussEffects } from "./discuss.effects";
import { LessonEffects } from "./lesson.effects";
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
];

export default effects;