
export interface CreateReplyDiscussInterface {
    content: String,
    discuss_id: String,
}


export interface ReplyDiscuss {
    _id?: String,
    content: String,
    author_id?: {
        _id?: string,
        username?: string,
        fullname?: string,
        avatar?: string,
    },
    discuss_id?: String,
    createdAt?: String,
    updatedAt?: String,
    likes?: String[],
    replies?: String[],
}