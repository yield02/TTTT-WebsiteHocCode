import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownSolid, heroChevronUpSolid } from '@ng-icons/heroicons/solid';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LessonFormComponent } from '../../../lesson-form/lesson-form.component';
import { Chapter } from '../../../../../models/Chapter';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { DeleteChapter, UpdateChapterTitle } from '../../../../../store/chapters/chapters.actions';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChapterFormComponent } from '../../../chapter-form/chapter-form.component';
import { CreateLessonInterface } from '../../../../../models/Lesson';
import { CreateLesson } from '../../../../../store/lessons/lessons.actions';
import { sortChapterDown, sortChapterUp } from '../../../../../store/mycoursemanager/mycoursemanager.actions';
import { selectChapterFromId } from '../../../../../store/chapters/chapters.selectors';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'study-chapter',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        MenuModule,
        ButtonModule,
        ConfirmDialogModule,

        LessonListComponent,
    ],
    providers: [provideIcons({
        heroChevronDownSolid,
        heroChevronUpSolid,
    }), DialogService, ConfirmationService],
    templateUrl: `./chapter.component.html`,
    styleUrl: './chapter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnInit, OnDestroy {

    @Input() index: number = 0;
    @Input() chapter_id!: String;
    @Input() course_id!: String;

    chapter!: Chapter;

    sorting: boolean = false;
    lessonCollapsed: boolean = false;

    // @Output() upsortEvent: EventEmitter<string> = new EventEmitter<string>();
    // @Output() downsortEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() saveSortEvent: EventEmitter<any> = new EventEmitter();

    moreAction: MenuItem[] = [{
        label: 'Cài đặt',
        items: [
            {
                label: 'Thêm bài học',
                icon: 'pi pi-plus',
                command: () => {
                    this._dialogSerice.open(LessonFormComponent, {
                        data: {
                            chapter_id: this.chapter._id,
                            course_id: this.course_id,
                        }
                    }).onClose.subscribe(
                        (lesson: CreateLessonInterface) => {
                            if (lesson) {
                                this._store.dispatch(CreateLesson({
                                    createLesson: {
                                        ...lesson,
                                        course_id: this.course_id
                                    }
                                }))
                            }
                        }
                    );
                }
            },
            {
                label: 'Sắp xếp chương',
                icon: 'pi pi-sort',
                command: () => {
                    this.toggleSorting();
                }
            },
            {
                label: 'Chỉnh sửa',
                icon: 'pi pi-pencil',
                command: () => {
                    this._dialogSerice.open(ChapterFormComponent, {
                        header: 'Chỉnh sửa chương',
                        data: {
                            chapterTitle: this.chapter.title,
                        }
                    }).onClose.subscribe((chapterTitle: string) => {
                        if (chapterTitle?.length > 0 && chapterTitle != this.chapter.title) {
                            this._store.dispatch(UpdateChapterTitle({
                                chapter_id: this.chapter._id,
                                title: chapterTitle,
                            }))
                        }
                    })
                }
            },
            {
                label: 'Xóa chương',
                icon: 'pi pi-trash',
                command: () => {

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
                            this._store.dispatch(DeleteChapter({ chapter_id: this.chapter._id, course_id: this.course_id }))
                        },
                        reject: () => {
                            console.log('hủy')
                        },
                    });

                }
            },
        ]
    }];

    createLessonForm: DynamicDialogRef | undefined;

    subscriptions: Subscription[] = [];


    constructor(private _dialogSerice: DialogService, private _confirmationService: ConfirmationService, private _store: Store<AppState>, private ref: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.subscriptions.push(this._store.pipe(select(selectChapterFromId(this.chapter_id))).subscribe(chapter => {
            if (chapter) {
                this.chapter = chapter;
                this.ref.detectChanges();
            }

        }));
    }




    toggleSorting() {
        this.sorting = !this.sorting;
    }
    toggleLessonCollapse(event: MouseEvent) {
        this.lessonCollapsed = !this.lessonCollapsed;
    }

    UpSort() {
        this._store.dispatch(sortChapterUp({ course_id: this.course_id, chapter_id: this.chapter._id }));
        // this.upsortEvent.emit('_id');
    }
    DownSort() {
        this._store.dispatch(sortChapterDown({ course_id: this.course_id, chapter_id: this.chapter._id }));
        // this.downsortEvent.emit('_id');
    }

    saveSort() {
        this.sorting = !this.sorting;
        this.saveSortEvent.emit();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
