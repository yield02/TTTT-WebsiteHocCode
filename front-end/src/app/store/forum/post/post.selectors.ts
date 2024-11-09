import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Post } from "../../../models/forum/Post";
import { AuthUser, User } from "../../../models/User";
import * as lodash from "lodash";




export const selectPosts = (state: AppState) => state.post;
export const selectUsers = (state: AppState) => state.users;
export const selectAuthor = (state: AppState) => state.user;

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


export const selectPostsOfAuthor = (filter: any) => createSelector(
    selectPosts,
    selectAuthor,
    (posts: Post[], user: AuthUser): Post[] => {

        let postsSort = posts.filter(p => p.author_id === user._id);


        let postSearch = postsSort.filter(c => c.title.toLowerCase().includes(filter.search.toLowerCase()) || filter.search === '' || filter.search === 'all');


        let result = lodash.orderBy(postSearch, filter.filter.field, filter.filter.type);
        return result;
    });