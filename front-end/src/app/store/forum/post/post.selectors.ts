import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Post } from "../../../models/forum/Post";




export const selectPosts = (state: AppState) => state.post;

export const selectPostWithPostId = (id: number) => createSelector(
    selectPosts,
    (posts: Post[]): Post | undefined => {
        return posts.find((post) => post.post_id == id);
    });

