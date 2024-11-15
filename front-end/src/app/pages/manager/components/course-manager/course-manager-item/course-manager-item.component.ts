import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuModule } from 'primeng/menu';
import { AppState } from '../../../../../store/reducer';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Course } from '../../../../../models/Course';
import { Observable } from 'tinymce';
import { User } from '../../../../../models/User';
import { selectAdminUserWithId } from '../../../../../store/admin/users/users.selectors';
import { manager_deleteCourses, manager_updateStatusCourses } from '../../../../../store/admin/course/course.actions';
import { ionSchool, ionTvSharp, ionWarning } from '@ng-icons/ionicons';
import { TooltipModule } from 'primeng/tooltip';
import { selectAdminLessonWithCourseId, selectAdminLessonWithId, selectNumberReportWithCourseId } from '../../../../../store/admin/course/course.selectors';
import { ShowListLessonDialogComponent } from './show-list-lesson-dialog/show-list-lesson-dialog.component';

@Component({
    selector: 'app-course-manager-item',
    standalone: true,
    imports: [
        CommonModule,
        CheckboxModule,
        DropdownModule,
        MenuModule,
        NgIconComponent,
        FormsModule,
        AvatarModule,
        ReactiveFormsModule,
        ButtonModule,
        ConfirmDialogModule,
        DynamicDialogModule,
        TooltipModule,

        ShowListLessonDialogComponent,
    ],
    providers: [DialogService, provideIcons({
        ionSchool,
        ionTvSharp,
        ionWarning
    })],
    templateUrl: './course-manager-item.component.html',
    styleUrl: './course-manager-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseManagerItemComponent {
    @Input() course!: Course;
    @Input() checkedAll: boolean = false;

    // Object!: Observable<Comment | Post>;
    author!: User | undefined;

    @Output() toggleCheckEvent: EventEmitter<{ course_id: string, state: boolean }> = new EventEmitter<{ course_id: string, state: boolean }>();

    isChecked: boolean = false;
    numberLesson: number = 0;
    numberReport: number = 0;

    items: MenuItem[] | undefined;

    searchTitle: FormControl = new FormControl('');
    status: FormControl = new FormControl('');


    dropDownItems: any[] = [
        {
            label: 'Chưa duyệt',
            value: 'waiting',
        },
        {
            label: 'Đã duyệt',
            value: 'active',
        },
        {
            label: 'Cấm',
            value: 'banned',
        }
    ];

    showLessonListRef: DynamicDialogRef | undefined;


    subscriptions: Subscription[] = [];

    constructor(
        private _store: Store<AppState>,
        private dialogService: DialogService,
        private confirmationService: ConfirmationService) {
    }

    showPostDialog() {
        this.showLessonListRef = this.dialogService.open(
            ShowListLessonDialogComponent,
            {
                header: 'Chi tiết khóa học',
                width: '70%',
                height: '90%',
                data: {
                    course_id: this.course._id,
                }
            }
        )

        // this.showDetailReportRef.onClose.subscribe((data) => {
        //     if (data) {
        //         this._store.dispatch(manager_updateStatusReports({ report_ids: [this.course._id!], state: 'processed' }))
        //     }
        // })

    }

    ngOnInit(): void {
        this.status.setValue(this.course.status?.state);

        this.items = [
            {
                label: 'Xem chi tiết',
                icon: 'pi pi-fw pi-search',
                command: () => {

                    this.showPostDialog();
                    // this._store.dispatch(manager_updateAdminRoleUsers({ user_ids: [this.course._id! as string], state }));

                },
            },
            {
                label: 'Xóa',
                icon: 'pi pi-fw pi-trash',
                command: () => {
                    this.confirmDelete();
                },
            },

        ];

        // select author

        this.subscriptions.push(this._store.pipe(select(selectAdminUserWithId(this.course.author_id))).subscribe(user => {
            this.author = user;
        }));

        this.subscriptions.push(this._store.pipe(select(selectAdminLessonWithCourseId(this.course._id as string))).subscribe(lesson => {
            if (lesson.length > 0) {
                this.numberLesson = lesson.length;
            }
        }));

        this.subscriptions.push(
            this._store.pipe(select(selectNumberReportWithCourseId(this.course._id as string))).subscribe(numberReport => {
                this.numberReport = numberReport;
            })
        )




        this.status.valueChanges.subscribe((status) => {
            this._store.dispatch(manager_updateStatusCourses({ course_ids: [this.course._id! as string], status: status, reason: '' }));
        });


    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa khóa học?',
            header: 'Xác nhận xóa',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",
            acceptLabel: 'Xóa',
            rejectLabel: 'Hủy',
            dismissableMask: true,

            accept: () => {
                this._store.dispatch(manager_deleteCourses({ ids: [this.course._id! as string] }));
            },
            reject: () => {
            }
        });
    }

    ngOnChanges(): void {
        this.isChecked = this.checkedAll;
    }

    toggleCheck(event: any) {
        this.toggleCheckEvent.emit({ course_id: this.course._id! as string, state: event.checked });
    }

    convertTypeReport(type: string) {
        switch (type) {
            case 'post':
                return 'Bài viết';
            case 'comment':
                return 'Bình luận';
            case 'lesson':
                return 'Bài học';
            default:
                return '';
        }
    }

    formatMyTime(time: string) {
        return formatDate(new Date(time), 'dd/MM/yyyy', 'vi');
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
