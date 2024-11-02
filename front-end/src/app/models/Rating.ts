export interface RatingInterface {
    _id?: String,
    author_id?: {
        _id: String,
        username: String,
        fullname: String,
        avatar: any,
    },
    course_id: String,
    star: Number,
    description?: String,
    createdAt?: String,
    updatedAt?: String,
}