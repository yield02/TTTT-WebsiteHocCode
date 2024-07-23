import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { OrderListModule, OrderList } from 'primeng/orderlist';
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
import { LessonListComponent } from '../lesson-list/lesson-list.component';
import { ChapterComponent } from '../chapter/chapter.component';
@Component({
    selector: 'course-form-chapter-list',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        OrderListModule,
        FieldsetModule,
        ConfirmDialogModule,

        LessonComponent,
        LessonListComponent,
        ChapterComponent,
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
    chapterList!: Observable<Chapter[]>;
    isFetching: boolean = false;
    constructor(
        private _store: Store<AppState>,
        private _chapterService: ChapterService,


    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnInit(): void {
        this.chapterList = this._store.pipe(
            select(chaptersSelectors.selectChaptersMangerFromCourseId(this.course_id)),
            switchMap(chapters => {
                if (chapters.length == 0 && !this.isFetching) {
                    this.isFetching = true;
                    console.log('return ChapterList from api');
                    return this._chapterService.getChapterList(this.course_id);
                }
                console.log('return ChapterList from store');
                return of(chapters);
            }),
        );
    }

    showChapterForm() {
        this.showChapterFormEvent.emit();
    }
    showLessonForm() {
        this.showLessonFormEvent.emit();
    }


    getOrder(event: Event) {
        console.log(event);
    }


}
