import { Lesson } from "./Lesson";

export interface Chapter {
    _id: String;
    title: String;
    author_id: String;
    lessons?: String[];
    createdAt?: String;
    updatedAt?: String;
    chapter_id?: Number;
}
