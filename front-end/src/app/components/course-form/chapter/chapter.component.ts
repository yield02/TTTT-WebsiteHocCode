import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { LessonListComponent } from '../lesson-list/lesson-list.component';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Chapter } from '../../../models/Chapter';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { ChapterFormComponent } from '../chapter-form/chapter-form.component';
import { exhaustMap, of } from 'rxjs';
import { DeleteChapter, UpdateChapterTitle } from '../../../store/chapters/chapters.actions';

@Component({
    selector: 'app-chapter',
    standalone: true,
    imports: [
        CommonModule,
        FieldsetModule,
        ButtonModule,

        LessonListComponent,
    ],
    templateUrl: './chapter.component.html',
    styleUrl: './chapter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnChanges {

    @Input() chapter!: Chapter;
    @Input() course_id!: String;

    collapsed: boolean = true;

    chapterFormRef: DynamicDialogRef | undefined;


    constructor(private _confirmationService: ConfirmationService,
        private _dialogService: DialogService, private _store: Store<AppState>) {

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    deleteChapter(chapter_id: String) {
        this._store.dispatch(DeleteChapter({ course_id: this.course_id, chapter_id: chapter_id }));
    }

    confirmDelete(chapter_id: String) {
        this._confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa chương này?',
            header: 'Xóa chương',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Xóa',
            rejectLabel: 'Hủy',
            dismissableMask: true,
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            accept: () => {
                this.deleteChapter(chapter_id);
            },
            reject: () => {
                console.log('hủy')
            },
        });
    }

    showEditChapter(chapter: Chapter) {
        this.chapterFormRef = this._dialogService.open(ChapterFormComponent, {
            header: 'Chỉnh sửa chương', data: {
                chapterTitle: chapter.title,
            }
        });
        this.chapterFormRef.onClose.pipe(
            exhaustMap((title) => {
                if (title && title != chapter.title) {
                    this._store.dispatch(UpdateChapterTitle({ chapter_id: chapter._id, title: title }))
                }
                return of(null);
            })
        ).subscribe();
    }


    collapsedChange(event: any) {
        console.log(event);
    }
}
