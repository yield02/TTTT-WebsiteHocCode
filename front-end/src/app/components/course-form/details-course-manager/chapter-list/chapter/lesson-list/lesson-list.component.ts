import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { LessonComponent } from './lesson/lesson.component';
import { PaginatorModule } from 'primeng/paginator';
import { BehaviorSubject, combineLatest, of, Subscription, switchMap, take, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CallAPIDeleteLessons, FetchingLessons, sortLesson, ToggleUpdatePublish } from '../../../../../../store/lessons/lessons.actions';
import { selectLessonsFromChapterId } from '../../../../../../store/lessons/lessons.selectors';
import { AppState } from '../../../../../../store/reducer';
import { Lesson } from '../../../../../../models/Lesson';
import { Chapter } from '../../../../../../models/Chapter';
import { getQuestionsFromLessionIds } from '../../../../../../store/question/question.actions';
import { selectQuestionsFromLessonIds } from '../../../../../../store/question/question.selectors';


interface Filter {
    page: number;
    first: number;
    rows: number;
    pageCount: number;
    total: number;
}

interface Actions {
    name: string;
    value: string
}


@Component({
    selector: 'study-lesson-list',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        CheckboxModule,
        PaginatorModule,
        DropdownModule,
        ConfirmDialogModule,

        LessonComponent,
    ],
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonListComponent implements OnInit, OnDestroy {
    @Input() chapter!: Chapter;

    filter: Filter = {
        page: 0,
        first: 0,
        rows: 10,
        pageCount: 0,
        total: 0
    }

    action: string = 'publishAll';

    actions: Actions[] = [
        { name: 'Xuất bản', value: 'publishAll' },
        { name: 'Ẩn', value: 'hiddenAll' },
        { name: 'Xóa tất cả', value: 'deleteAll' },
    ];

    Lesson$: BehaviorSubject<Lesson[]> = new BehaviorSubject<Lesson[]>([]);
    fetchedLesson: boolean = false;
    fetchedQuestion: boolean = false;

    checkList: string[] = [];

    checkAll: boolean = false;

    subscriptions: Subscription[] = [];

    constructor(private _store: Store<AppState>, private _confirmationService: ConfirmationService) {

    }

    ngOnInit(): void {
        this.subscriptions.push(this._store.pipe(select(selectLessonsFromChapterId(this.chapter._id)),
            switchMap(lessons => {
                if (lessons.length > 0) {
                    this.Lesson$.next(lessons);
                    this.filter.total = lessons.length;
                }
                if (lessons.length <= 0 && !this.fetchedLesson) {
                    const lesson_ids: string[] = lessons.map(lesson => lesson._id as string);
                    this._store.dispatch(FetchingLessons({ chapter_id: this.chapter._id }));
                    this.fetchedLesson = true;
                    return combineLatest({
                        questions: of([]),
                        lesson_ids: of(lesson_ids || [])
                    });
                }
                else {
                    const lesson_ids: string[] = lessons.map(lesson => lesson._id as string);
                    return combineLatest({
                        questions: this._store.pipe(select(selectQuestionsFromLessonIds(lesson_ids))),
                        lesson_ids: of(lesson_ids || [])
                    });
                }
            }), tap(data => {
                if (data?.questions?.length <= 0 && !this.fetchedQuestion && data?.lesson_ids?.length > 0) {
                    this._store.dispatch(getQuestionsFromLessionIds({ lesson_ids: data.lesson_ids }));
                    this.fetchedQuestion = true;
                }
            })).subscribe());
    }



    toggleCheckAll() {
        this.checkAll = !this.checkAll;
    }

    onPageChange(event: any) {
        this.filter = {
            ...this.filter,
            page: event.page,
            first: event.first,
            rows: event.rows
        };
    }

    checkLesson(event: { _id: string, state: boolean }) {
        if (event.state) {
            this.checkList.push(event._id);
        } else {
            this.checkList = this.checkList.filter(id => id !== event._id);
        }
    }

    checkAllLesson() {
        if (this.checkAll == true) {
            this.checkList = this.chapter.lessons as string[];
        }
        else {
            this.checkList = [];
        }
    }

    sortLesson() {
        this._store.dispatch(sortLesson({ chapter_id: this.chapter._id as string, lessons_id: this.chapter.lessons as string[] }))
    }

    onActions() {
        if (this.action == 'deleteAll') {
            this.confirmDelete()
        }
        else if (this.action == 'publishAll') {
            this._store.dispatch(ToggleUpdatePublish({ lessons_id: this.checkList, state: 'publish' }));

        }
        else if (this.action == 'hiddenAll') {
            this._store.dispatch(ToggleUpdatePublish({ lessons_id: this.checkList, state: 'hidden' }));

        }
    }

    confirmDelete() {

        this._confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn tất cả bài học này?',
            header: 'Xóa bài học',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Xóa',
            rejectLabel: 'Hủy',
            dismissableMask: true,
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            accept: () => {
                this._store.dispatch(CallAPIDeleteLessons({ lessons_id: this.checkList }))
                this.checkList = [];
            },
            reject: () => {
                console.log('hủy')
            },
        });
    }

    ngOnDestroy() {
        this.Lesson$.unsubscribe();
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}
