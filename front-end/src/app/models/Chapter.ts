import { Lesson } from "./Lesson";

export interface Chapter {
    _id: String;
    title: string;
    content: [Lesson] | [] | undefined;
    order?: number;
}
