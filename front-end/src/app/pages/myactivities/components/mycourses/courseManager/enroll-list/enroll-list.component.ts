import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EnrollItemComponent } from '../enroll-item/enroll-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Course } from '../../../../../../models/Course';
import { BehaviorSubject, debounceTime, map, Observable, Subject, Subscription, switchMap, tap } from 'rxjs';
import { User } from '../../../../../../models/User';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/reducer';
import { selectUserInCourseFromCourseId } from '../../../../../../store/users/users.selector';
import { DeleteUserEnrollFromAuth, fetchUsersInCourse } from '../../../../../../store/mycoursemanager/mycoursemanager.actions';
import { FormsModule, NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CourseManagerService } from '../../../../../../services/course-manger.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'course-manager-enroll-list',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        EnrollItemComponent,
        PaginatorModule,
        CheckboxModule,
        InputTextModule,
        ConfirmDialogModule,

        FormsModule,

    ],
    providers: [ConfirmationService],
    templateUrl: `./enroll-list.component.html`,
    styleUrl: './enroll-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollListComponent {
    @Input() course!: Course;

    findUserName: String = '';
    @ViewChild('searchForm') searchForm!: NgForm;

    userList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    checkAll: Boolean = false;
    usersCheckedId: String[] = [];

    userFetching$ = new Subject<{ username: String, pagination: { first: number, rows: number, total: number } }>();

    subcriptions: Subscription[] = [];
    paginator!: { first: number, rows: number, total: number };


    constructor(private _store: Store<AppState>, private _confirmService: ConfirmationService, private _courseManagerService: CourseManagerService) {
    }


    ngOnInit(): void {
        this.paginator = { first: 0, rows: 10, total: 0 };
        this.subcriptions.push(
            this.userFetching$.pipe(switchMap((data) => {
                if (data.username) {
                    return this.searchUser(data.username);
                }
                return this.fetching(data.pagination);
            })).subscribe((users) => {
                this.userList$.next(users);
            }));
    }


    ngAfterViewInit(): void {

        this.subcriptions.push(this.searchForm.valueChanges?.pipe(debounceTime(500), tap(data => {
            this.userFetching$.next({ username: data.username, pagination: this.paginator });
        })).subscribe()!);
        this.userFetching$.next({ username: '', pagination: this.paginator });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['course']) {
            this.userFetching$.next({ username: '', pagination: this.paginator });
        }
    }

    searchUser(username: String): Observable<User[]> {
        return this._courseManagerService.findUsersWithUserName(username, this.course._id!, 'enroll')
    }



    fetching(paginator: { first: number, rows: number, total: number }): Observable<User[]> {
        const start = paginator.first;
        const end = paginator.first + paginator.rows;
        this.paginator.total = this.course.enroll?.length || 0;
        return this._store.pipe(select(selectUserInCourseFromCourseId(this.course._id!, { start, end }, 'enroll'))).pipe(map(data => {
            if (data.fetchUsers.length > 0) {
                this._store.dispatch(fetchUsersInCourse({ course_id: this.course._id!, filter: { start, end }, typeList: 'enroll' }));
            }
            return data.users;
        }));
    }


    toggleCheckAll(): void {
        this.checkAll = !this.checkAll;
        this.usersCheckedId = [];
    }

    addCheckList(user_id: String): void {
        this.usersCheckedId.push(user_id);
    }

    removeCheckList(user_id: String): void {
        this.usersCheckedId = this.usersCheckedId.filter((id) => id !== user_id);
    }

    onPageOfChange(event: any) {
        this.paginator = { ...this.paginator, first: event.first };
        this.userFetching$.next({ username: this.findUserName, pagination: this.paginator });
    }



    onDeleteEnrollFromAuth() {
        if (this.usersCheckedId.length > 0) {
            this._store.dispatch(DeleteUserEnrollFromAuth({ course_id: this.course._id!, users_id: this.usersCheckedId }));
            this.usersCheckedId = [];
        }
    }

    DeleteEnrollFromAuthConfirm(event: Event) {
        this._confirmService.confirm({
            target: event.target as EventTarget,
            message: 'Bạn có chắc chắn muốn?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Đồng ý',
            rejectLabel: 'Hủy',
            acceptIcon: "none",
            rejectIcon: "none",
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                this.onDeleteEnrollFromAuth();
            },
            reject: () => {
            }
        });
    }



    ngOnDestroy(): void {
        this.subcriptions.forEach(sub => sub.unsubscribe());
    }
}
