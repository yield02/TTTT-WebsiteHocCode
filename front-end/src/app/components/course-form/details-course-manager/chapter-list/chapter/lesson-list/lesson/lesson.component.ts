import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownSolid, heroChevronUpSolid } from '@ng-icons/heroicons/solid';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { heroEyeSlash, heroUsers } from '@ng-icons/heroicons/outline';
import { select, Store } from '@ngrx/store';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { LessonFormComponent } from '../../../../../lesson-form/lesson-form.component';
import { Lesson, UpdateLessonInterface } from '../../../../../../../models/Lesson';
import { DeleteLesson, ToggleUpdatePublish, UpdateLesson } from '../../../../../../../store/lessons/lessons.actions';
import { AppState } from '../../../../../../../store/reducer';
import { SortDownLesson, SortUpLesson } from '../../../../../../../store/chapters/chapters.actions';
import { ShowLessonContentComponent } from '../../../../../show-lesson-content/show-lesson-content.component';
import { ExerciseManagerComponent } from '../../../../exercise-manager/exercise-manager.component';
import { selectQuestionFromQuestionId, selectQuestionsFromLessonId } from '../../../../../../../store/question/question.selectors';
import { Subscription, tap } from 'rxjs';
import { createQuestions } from '../../../../../../../store/question/question.actions';
import { Question } from '../../../../../../../models/Question';

@Component({
    selector: 'study-lesson',
    standalone: true,
    imports: [
        CommonModule,
        CheckboxModule,
        ButtonModule,
        NgIconComponent,
        MenuModule,
        FormsModule,
    ],
    providers: [provideIcons({
        heroChevronDownSolid,
        heroChevronUpSolid,
        heroEyeSlash,
        heroUsers
    })],
    templateUrl: `./lesson.component.html`,
    styleUrl: './lesson.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit, OnDestroy {
    @Input() checked: boolean = false;
    @Input() lesson!: Lesson;
    @Input() index!: number;
    @Input() chapter_id!: String;
    @Output() checkEvent: EventEmitter<{ _id: string, state: boolean }> = new EventEmitter<{ _id: string, state: boolean }>();
    @Output() sortEvent: EventEmitter<any> = new EventEmitter<any>();
    sorting: boolean = false;

    numberQuestion: number = 0;
    fetchedQuestion: boolean = false;

    contentRef: DynamicDialogRef | undefined;
    exerciseRef: DynamicDialogRef | undefined;

    moreAction: MenuItem[] = [{
        label: 'Cài đặt',
        items: [
            {
                label: 'Quản lý bài tập',
                icon: 'pi pi-plus',
                command: () => {
                    this.showExerciseManager();
                }
            },
            {
                label: 'Sắp xếp bài học',
                icon: 'pi pi-sort',
                command: () => {
                    this.toggleSorting();
                }
            },
            {
                label: 'Chỉnh sửa',
                icon: 'pi pi-pencil',
                command: () => {
                    this._dialogSerive.open(LessonFormComponent, {
                        data: {
                            lesson: this.lesson,
                            chapter_id: this.chapter_id,
                            course_id: this._activatedRoute.snapshot.params['courseid']
                        }
                    }).onClose.subscribe(
                        (lesson) => {
                            if (lesson) {
                                const updateLesson: UpdateLessonInterface = {
                                    ...lesson,
                                    _id: this.lesson._id,
                                    new_chapter_id: lesson.chapter_id,
                                    old_chapter_id: this.chapter_id,
                                    course_id: this._activatedRoute.snapshot.params['courseid'],
                                }
                                this._store.dispatch(UpdateLesson({
                                    lesson: updateLesson
                                }));
                            }
                        }
                    );
                }
            },
            {
                label: 'Xóa bài học',
                icon: 'pi pi-trash',
                command: () => {
                    this._confirmationService.confirm({
                        message: 'Bạn có chắc chắn muốn xóa bài học này?',
                        header: 'Xóa bài học',
                        icon: 'pi pi-exclamation-triangle',
                        acceptLabel: 'Xóa',
                        rejectLabel: 'Hủy',
                        dismissableMask: true,
                        acceptButtonStyleClass: "p-button-danger p-button-text",
                        rejectButtonStyleClass: "p-button-text p-button-text",
                        accept: () => {
                            this._store.dispatch(DeleteLesson({ chapter_id: this.chapter_id, lesson_id: this.lesson._id }))
                        },
                        reject: () => {
                            console.log('hủy')
                        },
                    });

                }
            },
        ]
    }];

    subscriptions: Subscription[] = [];

    constructor(private _dialogSerive: DialogService, private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private _confirmationService: ConfirmationService, private _changeDetector: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        !this.lesson.manager.publish ? this.moreAction[0].items!.push({
            label: 'Công khai',
            icon: 'pi pi-users',
            command: () => {
                this._store.dispatch(ToggleUpdatePublish({ lessons_id: [this.lesson._id] as string[] }))
            }
        }) : this.moreAction[0].items!.push({
            label: 'Ẩn',
            icon: 'pi pi-eye-slash',
            command: () => {
                this._store.dispatch(ToggleUpdatePublish({ lessons_id: [this.lesson._id] as string[] }))
            }
        });

        this.subscriptions.push(this._store.pipe(select(selectQuestionsFromLessonId(this.lesson._id as string))).pipe(
            tap((questions) => {
                if (questions?.length > 0) {
                    this.numberQuestion = questions.length;
                    this._changeDetector.detectChanges();

                }
            })
        ).subscribe());
    }

    toggleSorting(): void {
        this.sorting = !this.sorting;
    }

    moveUp() {
        this._store.dispatch(SortUpLesson({ chapter_id: this.chapter_id, lesson_id: this.lesson._id }));
    }

    moveDown() {
        this._store.dispatch(SortDownLesson({ chapter_id: this.chapter_id, lesson_id: this.lesson._id }));

    }

    saveSort() {
        this.toggleSorting();
        this.sortEvent.emit();
    }


    showContent(event: MouseEvent) {
        this.contentRef = this._dialogSerive.open(ShowLessonContentComponent, {
            header: "Nội dung bài học",
            width: '60%',
            height: '90%',
            data: { lesson: this.lesson },
            contentStyle: { 'overflow-y': 'auto' },
            modal: true,
        });
    }

    showExerciseManager() {
        this.exerciseRef = this._dialogSerive.open(ExerciseManagerComponent, {
            header: "Quản lý bài tập",
            width: '60%',
            height: '90%',
            data: { lesson: this.lesson },
            contentStyle: { 'overflow-y': 'auto' },
            modal: true,
            closable: false,
        })

        this.subscriptions.push(this.exerciseRef.onClose.subscribe(
            (questions) => {
                if (questions.length > 0) {
                    const questionsData = questions.map((question: Question) => {
                        return {
                            ...question,
                            lesson_id: this.lesson._id,
                            course_id: this._activatedRoute.snapshot.params['courseid']
                        }
                    });

                    this._store.dispatch(createQuestions({ questions: questionsData }));
                }
            }
        ));
    }




    checkEmit() {
        this.checkEvent.emit({ _id: this.lesson._id as string, state: this.checked });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
