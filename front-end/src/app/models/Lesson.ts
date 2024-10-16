export interface Lesson {
    _id: String,
    title: String,
    content?: String,
    video?: String,
    createdAt?: String,
    updatedAt?: String,
    course_id: String,
    manager: {
        publish: boolean
    }
}


export interface CreateLessonInterface {
    chapter_id: String,
    course_id: String,
    title: String,
    content: String,
    video: String
}

export interface UpdateLessonInterface {
    _id: String,
    title: String,
    content: String,
    video: String,
    new_chapter_id?: String,
    old_chapter_id?: String,
    course_id: String,
}