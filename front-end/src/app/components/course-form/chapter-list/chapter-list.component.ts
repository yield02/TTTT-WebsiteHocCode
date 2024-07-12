import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { FieldsetModule } from 'primeng/fieldset';
import { select, Store } from '@ngrx/store';
import { exhaustMap, map, Observable, of, switchMap, tap } from 'rxjs';


import { Chapter } from '../../../models/Chapter';
import { LessonComponent } from '../lesson/lesson.component';
import * as chaptersSelectors from '../../../store/chapters/chapters.selectors';
import * as coursesManagerSelectors from '../../../store/mycoursemanager/mycoursemanager.selectors';
import { AppState } from '../../../store/reducer';
import { ChapterService } from '../../../services/chapter.service';
import { ConfirmationService } from 'primeng/api';
import { DeleteChapter, UpdateChapter } from '../../../store/chapters/chapters.actions';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChapterFormComponent } from '../chapter-form/chapter-form.component';
@Component({
    selector: 'app-chapter-list',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        OrderListModule,
        FieldsetModule,
        ConfirmDialogModule,

        LessonComponent,
    ],
    providers: [ConfirmationService],
    templateUrl: './chapter-list.component.html',
    styleUrl: './chapter-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterListComponent implements OnInit, OnChanges {
    @Input() course_id!: String;

    @Output() showChapterFormEvent = new EventEmitter();
    @Output() showLessonFormEvent = new EventEmitter();

    lessonFormRef: DynamicDialogRef | undefined;
    chapterFormRef: DynamicDialogRef | undefined;
    chapterList!: Observable<Chapter[]>;
    isFetching: boolean = false;
    constructor(
        private _store: Store<AppState>,
        private _chapterService: ChapterService,
        private _confirmationService: ConfirmationService,
        private _dialogService: DialogService,

    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    ngOnInit(): void {
        this.chapterList = this._store.pipe(
            select(chaptersSelectors.selectChaptersFromId(this.course_id)),
            switchMap(chapters => {
                if (chapters.length == 0 && !this.isFetching) {
                    this.isFetching = true;
                    console.log('return ChapterList from api');
                    return this._chapterService.getChapterList(this.course_id);
                }
                console.log('return ChapterList from store');
                return of(chapters);
            })
        );
    }

    showChapterForm() {
        this.showChapterFormEvent.emit();
    }
    showLessonForm() {
        this.showLessonFormEvent.emit();
    }

    onSelectChapter(event: any) {
        console.log(event)
    }

    getOrder(event: any) {
        console.log(event);
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
                if (title != chapter.title) {
                    this._store.dispatch(UpdateChapter({ chapter_id: chapter._id, title: title }))
                }
                return of(null);
            })
        ).subscribe();
    }
}
