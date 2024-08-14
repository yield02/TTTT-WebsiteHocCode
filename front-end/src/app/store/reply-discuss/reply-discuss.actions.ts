import { createAction, props } from '@ngrx/store';
import { CreateReplyDiscussInterface, ReplyDiscuss } from '../../models/ReplyDiscuss';




export const FetchReplyDiscuss = createAction('[Reply-discuss component] Fetch ReplyDiscuss', props<{ replyDiscucssesId: String[] }>());
export const CreateReplyDiscuss = createAction("[Reply-discuss component] Create ReplyDiscuss", props<{ replyDiscuss: CreateReplyDiscussInterface }>());
export const DeleteReplyDiscuss = createAction("[Reply-discuss component] Delete ReplyDiscuss", props<{ replyDiscussId: String, discuss_id: String }>());
export const UpdateReplyDiscuss = createAction("[Reply-discuss component] Update ReplyDiscuss", props<{ replyDiscuss: ReplyDiscuss }>());
export const InteractReplyDiscuss = createAction("[Reply-discuss component] Interact ReplyDiscuss", props<{ replyDiscussId: String }>());


export const AddReplyDiscuss = createAction('[Reply-discuss component] Add ReplyDiscuss', props<{ replyDiscucsses: ReplyDiscuss[] }>());
export const DeleteReplyDiscussSucess = createAction("[Reply-discuss component] Delete ReplyDiscussSucess", props<{ replyDiscussId: String, discuss_id?: String }>());
export const UpdateReplyDiscussSucess = createAction("[Reply-discuss component] Update ReplyDiscussSucess", props<{ replyDiscuss: ReplyDiscuss }>());
