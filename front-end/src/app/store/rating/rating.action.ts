import { createAction, props } from "@ngrx/store";
import { RatingInterface } from "../../models/Rating";


export const CreateRating = createAction('[Rating-course component] Create Rating', props<{ rating: RatingInterface }>());
export const getRatingByCourseId = createAction('[Rating-course component] Get Rating By Course Id', props<{ courseId: string }>());

export const AddRatings = createAction('[Rating-course component] Add Ratings', props<{ ratings: RatingInterface[] }>());