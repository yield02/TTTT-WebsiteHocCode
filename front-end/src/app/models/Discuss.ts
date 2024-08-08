export interface Discuss {
    _id?: String,
    content: String,
    author_id?: String,
    lesson_id?: String,
    createdAt?: String,
    updatedAt?: String,
    replies?: Discuss[] | String[],
}