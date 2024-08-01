import { createAction, props } from "@ngrx/store";
import { User } from "../../models/User";

export const fetchUsers = createAction('[Users Component] Fetch Users', props<{ users_id: String[] }>());
export const fetchUsersSuccess = createAction('[Users Success] Fetch Users Success', props<{ users: User[] }>());
