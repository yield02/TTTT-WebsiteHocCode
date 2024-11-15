import { createSelector, select } from "@ngrx/store";
import { AppState } from "../../reducer";
import { Course } from "../../../models/Course";
import * as lodash from "lodash";



export const selectAdminManagerCourseState = (state: AppState) => state.admin_course;
export const selectAdminLessonCourseState = (state: AppState) => state.lessons;
const selectAdminReportCourseState = (state: AppState) => state.admin_report;

export const selectAdminCourseWithId = (_id: string) => {
    return createSelector(
        selectAdminManagerCourseState,
        (state) => state.find(post => post._id === _id)
    )
}

export const selectAdminLessonWithId = (_id: string) => createSelector(
    selectAdminLessonCourseState,
    (state) => state.find(lesson => lesson._id === _id));


export const selectAdminLessonWithCourseId = (courseId: string) =>
    createSelector(selectAdminLessonCourseState, (lessons) => {
        return lessons.filter(lesson => lesson.course_id === courseId);
    })


export const selectNumberReportWithCourseId = (courseId: string) => createSelector(
    selectAdminLessonCourseState, selectAdminReportCourseState, (lessons, report) => {
        let lesson_ids = lessons.filter(lesson => lesson.course_id === courseId).map(lesson => lesson._id);
        let reportWithCourseId = report.filter(report => {
            return lesson_ids.includes(report?.lesson_id?._id) && report.state == 'unprocessed'
        });
        return reportWithCourseId.length;
    })



export interface FilterAdminCourseInterace {
    course_name: string,
    subject_id: string,
    author: string,
    filter: { type: 'asc' | 'desc', fields: any }
}

export const selectCourseAdminWithFilter = (filter: FilterAdminCourseInterace) => createSelector(selectAdminManagerCourseState, (course: Course[]) => {


    let sortWithAuthorId = course.filter(c => c.author_id === filter.author || filter.author === '');

    let postSort = sortWithAuthorId.filter(c => c.course_name.toLowerCase().includes(filter.course_name.toLowerCase()) || filter.course_name === '' || filter.course_name === 'all');

    let coursesWithTopic = postSort.filter(c => c.subject_id === filter.subject_id || filter.subject_id === 'all');

    let result = lodash.orderBy(coursesWithTopic, filter.filter.fields, filter.filter.type);
    return result;
});


