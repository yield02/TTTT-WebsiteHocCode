import { Lesson } from "./Lesson";

export interface Chapter {
    id: number;
    title: string;
    content: [Lesson] | [] | undefined;
}
