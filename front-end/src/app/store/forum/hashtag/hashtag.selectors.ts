import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Hashtag } from "../../../models/forum/Hashtag";




export const selectHashtagState = (state: AppState) => state.hashtag;


export const selectHashtagWithIds = (ids: string[]) => createSelector(
    selectHashtagState,
    (hashtags: Hashtag[]): string => {

        console.log(ids);
        let hashtagfind = hashtags.filter(hashtag => ids.includes(hashtag._id));

        let hashtagsname = hashtagfind.map(hashtag => hashtag.name);

        return "#" + hashtagsname.join(', #');

    });

