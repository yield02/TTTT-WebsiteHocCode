export interface Discuss {
    _id?: String,
    content: String,
    author_id?: {
        _id?: string,
        username?: string,
        fullname?: string,
        avatar?: any,
    },
    lesson_id?: String,
    course_id?: String,
    createdAt?: String,
    updatedAt?: String,
    likes?: String[],
    replies?: String[],
}