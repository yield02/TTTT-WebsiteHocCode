import { User } from "../User";

export interface Topic {
    _id?: string;
    title: string;
    description: string;
    type: string;
    created_at: string;
    updated_at: string;
    totalPost: number;
    latestPost?: {
        _id: string;
        post_id: string;
        title: string;
        author: User;
    }
}