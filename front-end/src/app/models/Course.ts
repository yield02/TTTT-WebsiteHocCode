import { Chapter } from "./Chapter"

export interface Course {
    _id?: String,
    course_name: String,
    description: String,
    image?: {
        contentType: String,
        buffer: String
    },
    chapters?: String[],
}