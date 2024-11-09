
export interface Post {
    _id?: string;
    post_id?: number;
    topic?: string;
    title: string;
    content: Object;
    author_id?: string;
    like?: string[];
    views?: number;
    status?: 'waiting' | 'allow' | 'block';
    hashtags: string[];
    reason?: string;
    createdAt: string;
    updatedAt: string;
    manager?: {
        hidden: boolean;
        block_comment: boolean;
    }
}

export interface PostSearch {
    _id?: string;
    post_id?: number;
    topic?: string;
    title: string;
    content: Object;
    author_id?: {
        _id: string;
        user_id: number;
        username: string;
        fullname?: string;
    };
    like?: string[];
    views?: number;
    status?: 'waiting' | 'allow' | 'banned';
    hashtags: string[];
    reason?: string;
    createdAt: string;
    updatedAt: string;
    manager?: {
        hidden: boolean;
        block_comment: boolean;
    }
}