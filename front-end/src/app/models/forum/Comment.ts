export interface Comment {
    _id?: string;
    comment_id?: number;
    content: string;
    post?: string;
    author_id?: string;
    like?: string[];
    replies?: string[];
    isReply?: boolean;
    status?: 'allow' | 'block';
    reason?: string;
    createdAt?: string;
    updatedAt?: string;
}