import { Exercise } from "./Exercise";
import { LearningInterFace } from "./Learning";

export interface User {
    _id: String,
    user_id: Number,
    username: String,
    email?: String | undefined,
    fullname?: String | undefined,
    role: string,
    gender: Boolean,
    phone?: String | undefined,
    address: String | undefined,
    status: any,
    avatar?: {
        url?: String,
        contentType?: String,
        buffer?: String,
    },
    birthday?: String,
    createdAt?: string,
    updatedAt?: string,
    learning?: LearningInterFace,
    exercises?: Exercise[],
    totalPost?: Number,
    totalComment?: Number,
}

export interface AuthUser {
    _id: String,
    user_id: Number,
    username: String,
    email?: {
        data: String | undefined | "",
        verify: boolean | undefined,
        hidden: boolean | undefined,
    } | undefined,
    fullname?: String | undefined,
    role: string,
    gender: Boolean,
    phone?: {
        data: String | undefined | "",
        verify: boolean | undefined,
        hidden: boolean | undefined,
    } | undefined,
    address: String | undefined,
    status: Object,
    avatar?: {
        url?: String,
        contentType?: String,
        buffer?: String,
    },
    birthday?: String,
    createdAt?: string,
    updatedAt?: string,
    announcement: Announcement[];
}


export interface UpdateUserInformationInteraface {
    fullname: String,
    email: {
        data: String,
        hidden: boolean,
        verify: boolean,
    },
    phone: {
        data: String,
        hidden: boolean,
        verify: boolean,
    },
    birthday: String,
    gender: String,
    address: String,
}

export interface Announcement {
    _id: string,
    course_id: any,
    lesson_id: any,
    announcer: any,
    post_id: any,
    comment_id: any,
    typeAnnouncement: any,
    createdAt: string,
    updatedAt: string,
    state: 'read' | 'unread';
}