export interface Exercise {
    _id?: string;
    question_id: string;
    author_id: string;
    course_id: string;
    lesson_id: string;
    chapter_id: string;
    answer?: (string | boolean)[],
    code: {
        filename: string;
        content: string;
        language: string;
    }[];
    status: boolean;
    createdAt?: string;
    updatedAt?: string;
    language: string;
}