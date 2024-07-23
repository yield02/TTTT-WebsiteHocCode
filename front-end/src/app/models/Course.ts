import { Chapter } from "./Chapter"

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
    subject_id?: String
}
