
export interface Course {
    _id?: String,
    author_id?: String,
    course_name: String,
    image?: {
        contentType: String,
        buffer: String
    },
    status?: "waiting" | "active" | "banned";
    description: String,
    enroll?: String[],
    waiting_enroll?: String[],
    note?: String,
    chapters?: String[],
    createdAt?: String,
    updatedAt?: String,
    subject_id?: String,
    averageRating?: Number,
}


export interface CourseSearch {
    _id?: String,
    author_id?: {
        _id: string;
        user_id: number;
        username: string;
        fullname?: string;
    },
    course_name: String,
    image?: {
        contentType: String,
        buffer: String
    },
    status?: "waiting" | "active" | "banned";
    description: String,
    enroll?: String[],
    waiting_enroll?: String[],
    note?: String,
    chapters?: String[],
    createdAt?: String,
    updatedAt?: String,
    subject_id?: String,
    averageRating?: Number,
}