import { createAction, props } from '@ngrx/store';
import { Chapter } from '../../models/Chapter';


interface createChapter {
    course_id: String;
    title: String;
}

export const CreateChapter = createAction('[Chapters Component] Create', props<{ createChapter: createChapter }>());
export const CreateChapterSuccess = createAction('[Chapters Component] CreateSuccess', props<{ chapter: Chapter }>());


// export const loadChapter = createAction('[Chapters Component] loadChapter', props<{ chapter: Chapter }>());

export const FetchingChapters = createAction('[Chapters Component] FetchingChapters', props<{ course_id: String }>());
export const FetchChaptersSucess = createAction('[Chapters Component] FetchChaptersSucess', props<{ fetchValue: Chapter[] }>())

export const UpdateChapterTitle = createAction('[Chapters Component] Update Title', props<{ chapter_id: String, title: String }>());
export const UpdateChapter = createAction('[Chapters Component] Update Chapter', props<{ chapter: Chapter }>());
export const UpdateChapterSuccess = createAction('[Chapters Component] UpdateChapterSuccess', props<{ chapter_id: String, title: String }>());
export const UpdateChapterError = createAction('[Chapters Component] UpdateChapterError');
export const SortDownLesson = createAction('[Chapters Component] SortDownLesson', props<{ chapter_id: String, lesson_id: String }>());
export const SortUpLesson = createAction('[Chapters Component] SortUpLesson', props<{ chapter_id: String, lesson_id: String }>());


export const DeleteChapter = createAction('[Chapters Component] Delete', props<{ course_id: String, chapter_id: String }>());
export const DeleteChapterSuccess = createAction('[Chapters Component] DeleteSuccess', props<{ chapter_id: String }>());

export const ChapterCreateLesson = createAction('[Chapters Component] CreateLesson', props<{ chapter_id: String, lesson_id: String }>());
export const ChapterUpdateLesson = createAction('[Chapters Component] UpdateLesson', props<{ old_chapter_id: String, new_chapter_id: String, lesson_id: String }>());

export const ChapterDeleteLesson = createAction('[Chapters Component] DeleteLesson', props<{ chapter_id: String, lesson_id: String }>());