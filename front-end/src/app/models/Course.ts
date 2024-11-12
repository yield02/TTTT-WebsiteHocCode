
export interface Course {
    _id?: String,
    author_id?: {
        _id: string;
        username: string;
        fullname?: string;
        avatar: any;
    },
    course_name: String,
    image?: {
        contentType: String,
        buffer: String
    },
    status?: {
        state: "waiting" | "active" | "banned",
        reason?: string
    };
    description: String,
    enroll?: String[],
    waiting_enroll?: String[],
    note?: String,
    chapters?: String[],
    createdAt?: String,
    updatedAt?: String,
    subject_id?: String,
    averageRating?: Number,
    totalQuestion?: Number,
    totalLesson?: Number,
    manager?: {
        publish: boolean;
    }
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
    manager?: {
        publish: boolean;
    }
}