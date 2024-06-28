export interface User {
    _id: String,
    user_id: Number,
    username: String,
    email: String | undefined,
    fullname: String | undefined,
    role: [] | [Object],
    gender: Boolean,
    phone: String | undefined,
    address: String | undefined,
    status: Object,
}
