import { createSelector } from "@ngrx/store";
import { AppState } from "../../reducer";
import * as lodash from "lodash";
import { Post } from "../../../models/forum/Post";




export const selectAdminManagerPostState = (state: AppState) => state.admin_post;

export const selectAdminPostWithId = (_id: string) => {
    return createSelector(
        selectAdminManagerPostState,
        (state) => state.find(post => post._id === _id)
    )
}


export interface FilterAdminPostInterace {
    search: string,
    topic: string,
    author: string,
    filter: { type: 'asc' | 'desc', fields: any }
}

export const selectPostAdminWithFilter = (filter: FilterAdminPostInterace) => createSelector(selectAdminManagerPostState, (posts: Post[]) => {

    console.log(filter);

    let sortWithAuthorId = posts.filter(c => c.author_id === filter.author || filter.author === '');

    let postSort = sortWithAuthorId.filter(c => c.title.toLowerCase().includes(filter.search.toLowerCase()) || filter.search === '' || filter.search === 'all');

    let coursesWithTopic = postSort.filter(c => c.topic === filter.topic || filter.topic === 'all');

    let result = lodash.orderBy(coursesWithTopic, filter.filter.fields, filter.filter.type);
    return result;
});