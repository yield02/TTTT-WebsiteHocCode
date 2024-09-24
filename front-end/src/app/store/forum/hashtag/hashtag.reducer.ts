import { createReducer, on } from '@ngrx/store';
import { Hashtag } from '../../../models/forum/Hashtag';
import { addHashtags } from './hashtag.actions';



const initialState: Hashtag[] = [];

export const hashtagReducer = createReducer(
    initialState,
    on(addHashtags, (state, { hashtags }) => {
        return hashtags;
    })
);