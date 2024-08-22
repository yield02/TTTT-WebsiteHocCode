export interface User {
    _id: String,
    user_id: Number,
    username: String,
    email?: String | undefined,
    fullname?: String | undefined,
    role: [] | [Object],
    gender: Boolean,
    phone?: String | undefined,
    address: String | undefined,
    status: Object,
    avatar?: {
        url?: String,
        contentType?: String,
        buffer?: String,
    },
    birthday?: String,
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
    role: [] | [Object],
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