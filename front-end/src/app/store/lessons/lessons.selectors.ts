import { createSelector } from "@ngrx/store";
import { AppState } from "../reducer";
import { Chapter } from "../../models/Chapter";
import { Course } from "../../models/Course";
import { Lesson } from "../../models/Lesson";



const selectLessons = (state: AppState): Lesson[] => state.lessons;
const selectChapters = (state: AppState): Chapter[] => state.chapters;


export const selectLessonsFromChapterId = (chapter_id: String) => createSelector(
    selectLessons,
    selectChapters,
    (lessons: Lesson[], chapters: Chapter[]): Lesson[] => {
        const chapter: Chapter | undefined = chapters.find((c: Chapter) => c._id === chapter_id);
        if (chapter) {
            return lessons.filter((c: Lesson) => chapter!.lessons!.includes(c._id))
        }
        return []

    }
);


export const isFetchingLessons = (chapter_id: String) => createSelector(
    selectLessons,
    selectChapters,
    (lessons: Lesson[], chapters: Chapter[]): Boolean => {
        const chapter: Chapter | undefined = chapters.find((c: Chapter) => c._id === chapter_id);
        var lessonsFilter: Lesson[] = [];
        if (chapter) {
            lessonsFilter = lessons.filter((c: Lesson) => chapter!.lessons!.includes(c._id))
        }
        return chapter?.lessons?.length !== lessonsFilter.length;
    }
);

export const selectLessonFromId = (lesson_id: String) => createSelector(
    selectLessons,
    (lessons: Lesson[]): Lesson | undefined => lessons.find((l: Lesson) => l._id === lesson_id)
);