import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AppState } from '../../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Report } from '../../../../../models/Report';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { NgIconComponent } from '@ng-icons/core';
import { Lesson } from '../../../../../models/Lesson';
import { Comment } from '../../../../../models/forum/Comment';
import { Post } from '../../../../../models/forum/Post';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../../models/User';
import { selectAdminUserWithId } from '../../../../../store/admin/users/users.selectors';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReportManagerShowDetailComponent } from './report-manager-show-detail/report-manager-show-detail.component';
import { manager_deleteReports, manager_updateStatusReports } from '../../../../../store/admin/report/report.actions';

@Component({
    selector: 'app-report-manager-item',
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
    ],
    providers: [ConfirmationService, DialogService],
    templateUrl: './report-manager-item.component.html',
    styleUrl: './report-manager-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportManagerItemComponent {
    @Input() report!: Report;
    @Input() checkedAll: boolean = false;

    Object!: Observable<Comment | Post>;
    reporter!: User | undefined;

    @Output() toggleCheckEvent: EventEmitter<{ report_id: string, state: boolean }> = new EventEmitter<{ report_id: string, state: boolean }>();

    isChecked: boolean = false;

    items: MenuItem[] | undefined;

    searchTitle: FormControl = new FormControl('');
    status: FormControl = new FormControl('');


    dropDownItems: any[] = [
        {
            label: 'Đã duyệt',
            value: 'processed',
        },
        {
            label: 'Chưa duyệt',
            value: 'unprocessed',
        }
    ];

    showDetailReportRef: DynamicDialogRef | undefined;


    subscriptions: Subscription[] = [];

    constructor(private _store: Store<AppState>, private dialogService: DialogService, private confirmationService: ConfirmationService) {
    }

    showPostDialog() {
        this.showDetailReportRef = this.dialogService.open(
            ReportManagerShowDetailComponent,
            {
                header: 'Chi tiết',
                width: '70%',
                height: '90%',
                data: {
                    post_id: this.report.post_id,
                    lesson_id: this.report.lesson_id,
                    comment_id: this.report.comment_id,

                }
            }
        )

        this.showDetailReportRef.onClose.subscribe((data) => {
            if (data) {
                this._store.dispatch(manager_updateStatusReports({ report_ids: [this.report._id!], state: 'processed' }))
            }
        })

    }

    ngOnInit(): void {
        this.status.setValue(this.report.state);
        console.log(this.report);

        this.items = [
            {
                label: 'Xem chi tiết',
                icon: 'pi pi-fw pi-search',
                command: () => {

                    this.showPostDialog();
                    // this._store.dispatch(manager_({ user_ids: [this.report._id! as string], state }));

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

        // select reporter

        this.subscriptions.push(this._store.pipe(select(selectAdminUserWithId(this.report.reporter_id!))).subscribe(reporter => {
            this.reporter = reporter;
        }));

        this.status.valueChanges.subscribe((status) => {
            this._store.dispatch(manager_updateStatusReports({ report_ids: [this.report._id! as string], state: status }));
        })
    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa báo cáo?',
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
                this._store.dispatch(manager_deleteReports({ ids: [this.report._id! as string] }));
            },
            reject: () => {
            }
        });
    }

    ngOnChanges(): void {
        this.isChecked = this.checkedAll;
    }

    toggleCheck(event: any) {
        this.toggleCheckEvent.emit({ report_id: this.report._id! as string, state: event.checked });
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
