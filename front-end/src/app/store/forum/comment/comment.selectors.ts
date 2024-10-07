import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Post } from "../../../models/forum/Post";
import { Comment } from "../../../models/forum/Comment";



export const selectComments = (state: AppState) => state.comment.filter(comment => comment.isReply === false);
export const selectPosts = (state: AppState) => state.post;

export const selectCommentsWithPostId = (post_id: number, filter: { page: number, sortTime: 'desc' | 'asc' }) => createSelector(
    selectPosts,
    selectComments,
    (posts: Post[], comments: Comment[]): { comments: Comment[], totalComments: number } => {
        const post = posts.find(post => post.post_id == post_id);
        let filteredComments = comments.filter(comment => comment.post === post?._id);

        // Sort comments by likes and createdAt
        filteredComments = filteredComments.sort((a, b) => {
            const likeDifference = (b.like?.length || 0) - (a.like?.length || 0);
            if (likeDifference !== 0) {
                return likeDifference;
            }
            return filter.sortTime === 'desc'
                ? new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
                : new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
        });

        const startIndex = (filter.page - 1) * 10;
        const endIndex = startIndex + 10;
        return {
            comments: filteredComments.slice(startIndex, endIndex),
            totalComments: filteredComments.length
        };
    });


// if (filter.sortTime === 'desc') {
// } else {
//     filteredComments = filteredComments.sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
// }