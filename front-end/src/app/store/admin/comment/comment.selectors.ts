import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import * as lodash from "lodash";
import { Comment } from "../../../models/forum/Comment";


export const selectAdminManagerCommentState = (state: AppState) => state.admin_comment;

export const selectAdminCommentWithId = (_id: string) => {
    return createSelector(
        selectAdminManagerCommentState,
        (state) => state.find(comment => comment._id === _id)
    )
}


export interface FilterAdminCommentInterace {
    author: string,
    filter: { type: 'asc' | 'desc', fields: any }
}

export const selectCommentAdminWithFilter = (filter: FilterAdminCommentInterace) => createSelector(selectAdminManagerCommentState, (comments: Comment[]) => {
    let sortWithAuthorId = comments.filter(c => c.author_id === filter.author || filter.author === '');
    let result = lodash.orderBy(sortWithAuthorId, filter.filter.fields, filter.filter.type);
    return result;
});