import { createReducer, on } from "@ngrx/store";
import { RatingInterface } from "../../models/Rating";
import { AddRatings } from "./rating.action";

export const initialState: RatingInterface[] = [];

export const ratingReducer = createReducer(
    initialState,
    (on(AddRatings, (state, { ratings }) => [...state, ...ratings]))
);