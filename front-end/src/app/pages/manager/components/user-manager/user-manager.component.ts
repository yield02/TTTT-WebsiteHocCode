import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { FilterAdminUserInterace, selectUserAdminWithFilter } from '../../../../store/admin/users/users.selectors';
import { Observable } from 'tinymce';
import { User } from '../../../../models/User';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { manager_deleteUsers, manager_loadUsers, manager_updateStatusUsers } from '../../../../store/admin/users/users.actions';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { UserManagerItemComponent } from './user-manager-item/user-manager-item.component';
import { manager_loadPosts } from '../../../../store/admin/post/post.actions';
import { manager_loadComments } from '../../../../store/admin/comment/comment.actions';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}

@Component({
    selector: 'app-user-manager',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OverlayPanelModule,
        NgIconComponent,
        DropdownModule,
        PaginatorModule,
        AvatarModule,
        CheckboxModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,

        UserManagerItemComponent,
    ],
    providers: [provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    templateUrl: './user-manager.component.html',
    styleUrl: './user-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagerComponent {
    paginator: PageEvent = {
        first: 0,
        rows: 8,
        page: 0,
        pageCount: 0,
        total: 100
    }

    filter$: BehaviorSubject<FilterAdminUserInterace> = new BehaviorSubject<FilterAdminUserInterace>({
        username: '',
        filter: { type: 'desc', fields: ['status', 'createdAt', 'like.length', 'views'] }
    });
    filterValue: string | undefined;

    isChecked: boolean = false;
    isCheckAll: boolean = false;


    actionState: {
        state: 'status' | 'delete',
        status: "allow" | "block",
        reason: string,
        date: number
    } = {
            state: 'status',
            status: 'allow',
            reason: '',
            date: 0
        }
    userCheckList: string[] = [];


    searchUser: FormControl = new FormControl('');

    isSearching: boolean = false;
    users: User[] = [];

    loadUsers: boolean = false;


    constructor(private _store: Store<AppState>, private _changeDetectorRef: ChangeDetectorRef, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        if (!this.loadUsers) {
            this._store.dispatch(manager_loadUsers())
            this._store.dispatch(manager_loadPosts())
            this._store.dispatch(manager_loadComments())
            this.loadUsers = true;
        }


        this.filter$.pipe(
            switchMap(filter => this._store.pipe(select(selectUserAdminWithFilter(filter))))
        ).subscribe(users => {
            if (users.length > 0) {
                this.paginator.total = users.length;
                this.paginator.pageCount = Math.ceil(users.length / this.paginator.rows);
            }
            this.users = users || [];
            this._changeDetectorRef.detectChanges();
        });

        this.searchUser.valueChanges.pipe(
            debounceTime(500)
        ).subscribe(username => {
            this.filter$.next({
                ...this.filter$.value,
                username: username
            })
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
            this._store.dispatch(manager_updateStatusUsers({ user_ids: this.userCheckList, status: this.actionState.status, reason: this.actionState.reason, date: this.actionState.date }));
        }
        else if (this.actionState.state == 'delete') {
            // this._store.dispatch(manager_deleteUsers({ ids: this.userCheckList }));
            this.confirmDelete();
        }
    }

    toggleCheckUser(event: { user_id: string, state: boolean }) {
        if (event.state) {
            this.userCheckList.push(event.user_id);
        }
        else {
            this.userCheckList = this.userCheckList.filter(id => id !== event.user_id);
        }
        if (this.userCheckList.length === this.users.length) {
            this.isChecked = true;
            this.isCheckAll = this.userCheckList.length === this.users.length;
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
            this.userCheckList = this.users.map(user => user._id! as string) || [];
            this._changeDetectorRef.detectChanges();
        }
        else {
            this.isCheckAll = false;
            this.userCheckList = [];
        }
    }

    confirmDelete() {
        this.confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa người dùng?',
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
                this._store.dispatch(manager_deleteUsers({ ids: this.userCheckList }));
            },
            reject: () => {
            }
        });
    }

    ngOnDestroy(): void {
        this.filter$.complete();
    }
}







