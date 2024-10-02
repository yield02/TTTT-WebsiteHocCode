export interface Post {
    _id?: string;
    post_id?: number;
    topic?: string;
    title: string;
    content: Object;
    author?: string;
    like?: string[];
    views?: number;
    status?: 'waiting' | 'allow' | 'banned';
    hashtags: string[];
    reason?: string;
    createdAt: string;
    updatedAt: string;
}