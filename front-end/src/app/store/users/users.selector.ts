import { createSelector, select } from "@ngrx/store";
import { Course } from "../../models/Course";
import { AppState } from "../reducer";
import { User } from "../../models/User";
import { Filter } from "../../models/Filter";
import { selectUser } from "../user/user.selectors";



export const selectUsers = (state: AppState) => state.users;
export const selectCourses = (state: AppState) => state.courses;
export const selectCoursesManger = (state: AppState) => state.myCourseManager;



export const selectUserFromId = (user_id: String) => createSelector(selectUsers, (users: User[]) => {
    return users.find((user: User) => user._id == user_id);
});

export const selectUserFetch = (users_id: string[]) => createSelector(selectUsers, (users: User[]) => {

    let returnUser: string[] = [];

    users_id.forEach(user_id => {
        if (!users.find(user => user._id == user_id)) {
            returnUser.push(user_id);
        }
    });

    return returnUser;
})

export const selectUsersEnrollFetchFromCourseId = (course_id: String) => createSelector(
    selectCourses,
    selectUsers,
    (courses: Course[], users: User[]) => {
        let enrollUser = courses.find((c: Course) => c._id === course_id)?.enroll?.reverse();
        if (enrollUser && enrollUser?.length > 0) {
            let fetchUserArray: String[] = [];
            users.forEach(user => {
                if (!enrollUser.includes(user._id)) {
                    fetchUserArray.push(user._id);
                }
            });
            return fetchUserArray;
        }
        return [];
    }
);


export const selectUsersEnrollFromCourseId = (course_id: String, page: number, row: number) => createSelector(
    selectCourses,
    selectUsers,
    (courses: Course[], users: User[]) => {
        let enrollUser = courses.find((c: Course) => c._id === course_id)?.enroll?.reverse();
        if (enrollUser && enrollUser?.length > 0) {
            let fetchUserArray: User[] = [];
            users.forEach(user => {
                if (enrollUser.includes(user._id)) {
                    fetchUserArray.push(user);
                }
            });
            return fetchUserArray.slice((page - 1) * row, page * row);
        }
        return [];
    }
);



export const selectUsersFromUsersId = (users_id: String[]) => createSelector(
    selectUsers,
    (users: User[]): User[] => users.filter((c: User) => users_id.includes(c._id))
);

export const selectUsersAndFetchingUsers = (users_id: String[]) => createSelector(
    selectUsers,
    (users: User[]): { users: User[], fetchUsers: String[] } => {

        let userList: User[] = users.filter((c: User) => users_id.includes(c._id));
        let userListId = userList.map((c: User) => c._id);
        let fetchUsers: String[] = users_id.filter((c: String) => !userListId.includes(c));


        return { users: userList, fetchUsers: fetchUsers };
    }
);

export const selectUsersFromUserName = (users_id: String[], userName: String) => createSelector(
    selectUsers,
    (users: User[]): User[] => {
        return users.filter((c: User) => c.username.toLowerCase().includes(userName.toLowerCase()) && users_id.includes(c._id));
    });

export const selectUserInCourseFromCourseId = (course_id: String, filter: Filter, typeList: 'enroll' | 'waiting_enroll') => createSelector(
    selectCoursesManger,
    selectUsers,
    (courses: Course[], users: User[]): { users: User[], fetchUsers: String[] } => {
        let course = courses.find((c: Course) => c._id === course_id);
        let userList: User[] = [];
        let fetchUsers: String[] = [];
        if (!course) {
            return { users: [], fetchUsers: [] };
        }

        // console.log("start", filter.start)
        // console.log("end", filter.end)

        let courseUserList = [...course[typeList] || []];
        if (filter.sort == 'desc') {
            courseUserList.reverse();
        }

        const users_id = courseUserList.slice(filter.start, filter.end) || [];
        // console.log('users_id', users_id, filter.sort);
        userList = users.filter((u: User) => users_id!.includes(u._id));
        let userListId = userList.map((c: User) => c._id);
        fetchUsers = users_id.filter((c: String) => !userListId.includes(c));

        // console.log('fetch User', fetchUsers);
        // console.log('users', userList);

        return { users: userList, fetchUsers: fetchUsers };
    }
)