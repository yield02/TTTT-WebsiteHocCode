import { createSelector, select } from "@ngrx/store";
import { AppState } from "../reducer";
import { ReplyDiscuss } from "../../models/ReplyDiscuss";
import { Discuss } from "../../models/Discuss";


const selectReplyDisucsses = (state: AppState) => state.replyDiscuss;
const selectDisucsses = (state: AppState) => state.discuss;

// export const selectDiscussFromLessonId = (lesson_id: String) => createSelector(
//     selectReplyDisucsses,
//     (discuss: ReplyDiscuss[]): ReplyDiscuss[] => {
//         return discuss.filter((c: ReplyDiscuss) => c.lesson_id === lesson_id);
//     })




export const selectReplyDiscussFromDiscussId = (discuss_id: String) => createSelector(
    selectDisucsses,
    selectReplyDisucsses,
    (discusses: Discuss[], replyDiscusses: ReplyDiscuss[]) => {

        const discuss = discusses.find(item => item._id === discuss_id);
        if (!discuss) return { replyDiscusses: [], fetchReplyDiscussId: [] };

        let fetchReplyDiscussId = discuss?.replies || [];

        let replyDiscussListIdInStore: String[] = [];
        let replyDisccussList = replyDiscusses.filter(item => {
            if (fetchReplyDiscussId.includes(item._id!)) {
                replyDiscussListIdInStore.push(item._id!);
                return true;
            }
            return false;
        });

        fetchReplyDiscussId = fetchReplyDiscussId.filter(item => !replyDiscussListIdInStore.includes(item));


        return { replyDiscusses: replyDisccussList, fetchReplyDiscussId: fetchReplyDiscussId }
    }
);