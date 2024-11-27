import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { select, Store } from '@ngrx/store';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { AppState } from '../../../../store/reducer';
import { manager_deleteReports, manager_loadReports, manager_updateStatusReports } from '../../../../store/admin/report/report.actions';
import { manager_loadPosts } from '../../../../store/admin/post/post.actions';
import { manager_loadComments } from '../../../../store/admin/comment/comment.actions';
import { manager_loadUsers } from '../../../../store/admin/users/users.actions';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { Report } from '../../../../models/Report';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FilterAdminReportInterace, selectReportAdminWithFilter } from '../../../../store/admin/report/report.selectors';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ReportManagerItemComponent } from './report-manager-item/report-manager-item.component';
import { manager_loadLessons } from '../../../../store/admin/course/course.actions';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}


@Component({
    selector: 'app-report-manager',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OverlayPanelModule,
        NgIconComponent,
        DropdownModule,
        PaginatorModule,
        ButtonModule,
        ConfirmDialogModule,
        CheckboxModule,

        ReportManagerItemComponent,

    ],
    providers: [provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    templateUrl: './report-manager.component.html',
    styleUrl: './report-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportManagerComponent implements OnInit {
    paginator: PageEvent = {
        first: 0,
        rows: 8,
        page: 0,
        pageCount: 0,
        total: 100
    }

    filter$: BehaviorSubject<FilterAdminReportInterace> = new BehaviorSubject<FilterAdminReportInterace>({
        filter: { type: 'desc', fields: ['state', 'createdAt'] }
    });
    filterValue: string | undefined;

    isChecked: boolean = false;
    isCheckAll: boolean = false;


    actionState: {
        state: 'status' | 'delete',
        status: "processed" | "unprocessed",
        reason: string,
        date: number
    } = {
            state: 'status',
            status: 'processed',
            reason: '',
            date: 0
        }
    reportCheckList: string[] = [];



    isSearching: boolean = false;
    reports: Report[] = [];



    constructor(private _store: Store<AppState>, private _changeDetectorRef: ChangeDetectorRef, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this._store.dispatch(manager_loadUsers())
        this._store.dispatch(manager_loadPosts())
        this._store.dispatch(manager_loadComments())
        this._store.dispatch(manager_loadReports())
        this._store.dispatch(manager_loadLessons());


        this.filter$.pipe(
            switchMap(filter => this._store.pipe(select(selectReportAdminWithFilter(filter))))
        ).subscribe(reports => {
            if (reports.length > 0) {
                this.paginator.total = reports.length;
                this.paginator.pageCount = Math.ceil(reports.length / this.paginator.rows);
            }
            this.reports = reports || [];
            this._changeDetectorRef.detectChanges();
        });
    }
    toggleSearching() {
        this.isSearching = !this.isSearching;
    }

    fieldFilterChange(event: any) {
        this.filter$.next({
            ...this.filter$.value,
            filter: { ...this.filter$.value.filter, fields: event.value }
        })
    }

    typeFilterChange(event: any) {

        this.filter$.next({
            ...this.filter$.value,
            filter: { ...this.filter$.value.filter, type: event.value }
        })

    }


    customFilterFunction(event: KeyboardEvent, options: DropdownFilterOptions) {
        if (options.filter) {
            options.filter(event);
        }
    }

    resetFunction(options: DropdownFilterOptions) {
        if (options.reset) {
            options.reset();
        };
        this.filterValue = '';
    }

    onPageChange(event: any) {
        this.paginator = {
            ...this.paginator,
            page: event.page,
            first: event.first,
            pageCount: event.pageCount,
        }
    }

    applyAction() {
        if (this.actionState.state == 'status') {
            this._store.dispatch(manager_updateStatusReports({ report_ids: this.reportCheckList, state: this.actionState.status, reason: this.actionState.reason }));
        }
        else if (this.actionState.state == 'delete') {
            // this._store.dispatch(manager_deleteUsers({ ids: this.reportCheckList }));
            this.confirmDelete();
        }
    }

    toggleCheckReport(event: { report_id: string, state: boolean }) {
        if (event.state) {
            this.reportCheckList.push(event.report_id);
        }
        else {
            this.reportCheckList = this.reportCheckList.filter(id => id !== event.report_id);
        }
        if (this.reportCheckList.length === this.reports.length) {
            this.isChecked = true;
            this.isCheckAll = this.reportCheckList.length === this.reports.length;
        }
        else {
            this.isChecked = false;
        }
    }

    checkAll(event: any) {
        this.isChecked = event.checked;
        if (event.checked == true) {
            this.isCheckAll = true;
            this.isChecked = true;
            this.reportCheckList = this.reports.map(report => report._id! as string) || [];
            this._changeDetectorRef.detectChanges();
        }
        else {
            this.isCheckAll = false;
            this.reportCheckList = [];
        }
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
                this._store.dispatch(manager_deleteReports({ ids: this.reportCheckList }));
            },
            reject: () => {
            }
        });
    }

    ngOnDestroy(): void {
        this.filter$.complete();
    }
}



