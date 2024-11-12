import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';
import { Post } from '../../../models/forum/Post';
import { Comment } from '../../../models/forum/Comment';

export const initialState: Comment[] = [];

export const admin_CommentReducer = createReducer(
    initialState,
    // on(Update, (state, { updateValue }) => {
    //     // console.log(updateValue);
    //     return { ...state, ...updateValue };
    // }),
);