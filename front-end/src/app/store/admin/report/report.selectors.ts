import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import * as lodash from "lodash";
import { Post } from "../../../models/forum/Post";
import { Comment } from "../../../models/forum/Comment";
import { User } from "../../../models/User";
import { Report } from "../../../models/Report";





export const selectAdminManagerUserState = (state: AppState) => state.admin_user;
export const selectAdminManagerCommentState = (state: AppState) => state.admin_comment;
export const selectAdminManagerPostState = (state: AppState) => state.admin_post;
export const selectAdminManagerReportState = (state: AppState) => state.admin_report;



export const selectAdminUserWithId = (_id: string) =>
    createSelector(selectAdminManagerUserState, (state) => state.find(user => user._id === _id));


export interface FilterAdminReportInterace {
    filter: { type: 'asc' | 'desc', fields: any }
}

// export const selectReportAdminWithFilter = (filter: FilterAdminReportInterace) =>
//     createSelector
//         (selectAdminManagerUserState, selectAdminManagerPostState, selectAdminManagerCommentState, selectAdminManagerReportState, (
//             user: User[],
//             posts: Post[],
//             comments: Comment[],
//             reports, Report[],
//         ) => {

//             let userSortWithUserName = user.filter(c => c.username.toLowerCase().includes(filter.username.toLowerCase()) || filter.username === '' || filter.username === 'all');

//             let userWithTotalPost = userSortWithUserName.map(c => {
//                 let totalPost = posts.filter(p => p.author_id === c._id).length;
//                 let totalComment = comments.filter(p => p.author_id === c._id).length;
//                 return { ...c, totalPost, totalComment }
//             })
//             let result = lodash.orderBy(userWithTotalPost, filter.filter.fields, filter.filter.type);
//             return result;
//         });

export const selectReportAdminWithFilter = (filter: FilterAdminReportInterace) => createSelector(
    selectAdminManagerUserState,
    selectAdminManagerPostState,
    selectAdminManagerCommentState,
    selectAdminManagerReportState,
    (
        user: User[],
        posts: Post[],
        comments: Comment[],
        reports: Report[],
    ) => {

        let result = lodash.orderBy(reports, filter.filter.fields, filter.filter.type);

        return result;
    }
)