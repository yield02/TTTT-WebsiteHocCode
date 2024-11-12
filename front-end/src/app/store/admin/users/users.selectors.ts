import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import { User } from "../../../models/User";
import * as lodash from "lodash";





export const selectAdminManagerUserState = (state: AppState) => state.admin_user;



export const selectAdminUserWithId = (_id: string) => createSelector(selectAdminManagerUserState, (state) => state.find(user => user._id === _id));


export interface FilterInterace {
    username: string,
    filter: { type: 'asc' | 'desc', field: string }
}

export const selectPostWithFilter = (filter: FilterInterace) => createSelector(selectAdminManagerUserState, (users: User[]) => {
    let postSort = users.filter(c => c.username.toLowerCase().includes(filter.username.toLowerCase()) || filter.username === '');
    let result = lodash.orderBy(postSort, filter.filter.field, filter.filter.type);
    return result;
});