import { createAction, props } from '@ngrx/store';
import { Chapter } from '../../models/Chapter';


interface createChapter {
    course_id: String;
    title: String;
}

export const CreateChapter = createAction('[Chapters Component] Create', props<{ createChapter: createChapter }>());
export const CreateChapterSuccess = createAction('[Chapters Component] CreateSuccess', props<{ chapter: Chapter }>());


export const FetchChapters = createAction('[Chapters Component] FetchChapters', props<{ fetchValue: Chapter[] }>())

export const UpdateChapter = createAction('[Chapters Component] Update', props<{ chapter_id: String, title: String }>());
export const UpdateChapterSuccess = createAction('[Chapters Component] UpdateChapterSuccess', props<{ chapter_id: String, title: String }>());
export const UpdateChapterError = createAction('[Chapters Component] UpdateChapterError');

export const DeleteChapter = createAction('[Chapters Component] Delete', props<{ course_id: String, chapter_id: String }>());
export const DeleteChapterSuccess = createAction('[Chapters Component] DeleteSuccess', props<{ chapter_id: String }>());