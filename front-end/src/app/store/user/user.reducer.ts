import { createReducer, on } from '@ngrx/store';
import { Update, Delete, getAnnouncementsSuccess, stateChangeAnnouncementSuccess, deleteAnnouncementsSuccess } from './user.actions';
import { AuthUser, User } from '../../models/User';
import { state } from '@angular/animations';

export const initialState: AuthUser = {
    _id: '',
    user_id: 0,
    username: '',
    email: {
        data: '',
        verify: false,
        hidden: false,
    },
    fullname: '',
    role: [],
    gender: false,
    phone: {
        data: '',
        verify: false,
        hidden: false,
    },
    address: '',
    status: {},
    announcement: [],
}

export const userReducer = createReducer(
    initialState,
    on(Update, (state, { updateValue }) => {
        // console.log(updateValue);
        return { ...state, ...updateValue };
    }),
    on(Delete, (state) => {
        return initialState;
    }),
    on(getAnnouncementsSuccess, (state, { announcement }) => {
        return {
            ...state,
            announcement: announcement
        };
    }),
    on(stateChangeAnnouncementSuccess, (state, { announcement_ids, status }) => {

        return {
            ...state,
            announcement: state.announcement.map((item) => {
                if (announcement_ids.includes(item._id)) {
                    return {
                        ...item,
                        state: status
                    }
                }
                return item;
            })
        };
    }),
    on(deleteAnnouncementsSuccess, (state, { announcement_ids }) => {
        return {
            ...state,
            announcement: state.announcement.filter((item) => !announcement_ids.includes(item._id))
        }
    }),
);