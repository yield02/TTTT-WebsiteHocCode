export interface Report {
    _id?: string,
    course_id?: string,
    lesson_id?: any,
    post_id?: string,
    comment_id?: string,
    content: string,
    type_report: 'post' | 'comment' | 'course' | 'lesson',
    state?: 'unprocessed' | 'processed',
    createdAt?: string,
    reporter_id?: string,
}