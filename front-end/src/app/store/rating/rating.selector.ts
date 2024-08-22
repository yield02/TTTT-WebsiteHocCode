import { createSelector } from "@ngrx/store";
import { RatingInterface } from "../../models/Rating";
import { AppState } from "../reducer";

const selectRating = (state: AppState) => state.rating;

export const selectRatingOfCourse = (course_id: String) => createSelector(
    selectRating,
    (ratings: RatingInterface[]): RatingInterface[] => {
        return ratings.filter((rating: RatingInterface) => rating.course_id === course_id);
    });
