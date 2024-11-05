import { createSelector, select } from "@ngrx/store";
import { AppState } from "../reducer";
import { ReplyDiscuss } from "../../models/ReplyDiscuss";
import { Discuss } from "../../models/Discuss";
import { Subject } from "../../models/Subject";


const selectSubjectState = (state: AppState) => state.subjects;




export const selectSubjectWithId = (subject_id: String) => createSelector(
    selectSubjectState,
    (subjects: Subject[]) => {
        return subjects.find(subject => subject._id === subject_id);
    }
);