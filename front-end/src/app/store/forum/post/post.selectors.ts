import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Post } from "../../../models/forum/Post";
import { User } from "../../../models/User";




export const selectPosts = (state: AppState) => state.post;
export const selectUsers = (state: AppState) => state.users;

export const selectPostWithPostId = (id: number) => createSelector(
    selectPosts,
    (posts: Post[]): Post | undefined => {
        return posts.find((post) => post.post_id == id);
    });

export const selectAuthorPostId = (post_id: number) => createSelector(
    selectPosts,
    selectUsers,
    (posts: Post[], users: User[]): User | undefined => {
        const post = posts.find((post) => post.post_id == post_id);
        if (!post) {
            return undefined;
        }

        return users.find((user) => user._id === post.author_id);
    });
