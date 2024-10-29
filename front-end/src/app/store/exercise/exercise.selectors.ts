import { createSelector, select } from "@ngrx/store";
import { AppState } from "../reducer";
import { Exercise } from "../../models/Exercise";


const selectExercises = (state: AppState) => state.exercise;




export const selectExercisesByChapterId = (chapter_id: string) =>
    createSelector(selectExercises, (exercises: Exercise[]) => {
        return exercises.filter((exercise) => exercise.chapter_id === chapter_id);
    });

export const selectExercisesByLessonId = (lesson_id: string) =>
    createSelector(selectExercises, (exercises: Exercise[]) => {
        return exercises.filter((exercise) => exercise.lesson_id === lesson_id);
    });

export const selectExercisesByCourseId = (course_id: string) =>
    createSelector(selectExercises, (exercises: Exercise[]) => {
        return exercises.filter((exercise) => exercise.course_id === course_id);
    });

export const selectExerciseById = (exercise_id: string) =>
    createSelector(selectExercises, (exercises: Exercise[]) => {
        return exercises.find((exercise) => exercise._id === exercise_id);
    });