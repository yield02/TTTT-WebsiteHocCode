import { createAction, props } from '@ngrx/store';
import { Discuss } from '../../models/Discuss';




export const FetchingDiscusses = createAction('[Discuss component] Fetching Discusses', props<{ lesson_id: String }>());
export const FetchingDiscussesFromCourseId = createAction('[Discuss component] Fetching Discusses From CourseId', props<{ course_id: String, lesson_id?: string }>());

export const CreateDiscuss = createAction('[Discuss component] Create Discuss', props<{ discuss: Discuss }>());
export const UpdateContentDiscuss = createAction('[Discuss component] Update Discuss', props<{ discuss: Discuss }>());
export const DeleteDiscussByAuthor = createAction('[Discuss component] Delete Discuss', props<{ discuss_id: String }>());
export const DeleteDiscussByAuthorCourse = createAction('[Discuss component] Delete Discuss By Author Course', props<{ discuss_id: String }>());
export const InteractDiscuss = createAction('[Discuss component] Interaction', props<{ discuss_id: String }>());

export const AddDiscuss = createAction("[Discuss component] Add Discuss", props<{ discusses: Discuss[] }>());
export const UpdateDiscussSuccess = createAction("[Discuss component] Update Discuss Success", props<{ discuss: Discuss }>());
export const DeleteDiscussSuccess = createAction("[Discuss component] Delete Discuss Success", props<{ discuss_id: String }>());

export const ReplaceAllDiscussions = createAction("[Discuss component] Replace All Discussions", props<{ discusses: Discuss[] }>());


export const AddReplyDiscussToDiscuss = createAction("[Discussion component] AddReply Discussion", props<{ discuss_id: String, replyDiscuss_id: String }>());
export const DeleteReplyDiscussFromDiscuss = createAction("[Discussion component] DeleteReply Discussion", props<{ discuss_id: String, replyDiscuss_id: String }>());