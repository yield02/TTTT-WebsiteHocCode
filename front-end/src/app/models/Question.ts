export interface Question {
    _id: string;
    title: string;
    content: string;
    type: 'code' | 'choice' | 'multichoice';
    language?: string;
    options?: string[];
    answer?: (boolean | string)[];
    explanation?: string;
    testKey?: {
        input?: string;
        output: string;
    }[];
    author_id?: string;
    course_id?: string;
    lesson_id?: string;
}