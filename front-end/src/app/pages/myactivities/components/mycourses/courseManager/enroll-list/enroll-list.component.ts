import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EnrollItemComponent } from '../enroll-item/enroll-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Course } from '../../../../../../models/Course';
import { map, Observable, of, switchMap } from 'rxjs';
import { User } from '../../../../../../models/User';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../../store/reducer';
import { selectUsersAndFetchingUsers } from '../../../../../../store/users/users.selector';
import { fetchUsers } from '../../../../../../store/users/users.actions';

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

    ],
    templateUrl: `./enroll-list.component.html`,
    styleUrl: './enroll-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollListComponent {
    @Input() course!: Course;
    enrollIdList!: String[];
    enrollUsers$!: Observable<User[]>;





    paginator!: { first: number, rows: number, total: number };


    constructor(private _store: Store<AppState>) {
        this.paginator = { first: 0, rows: 10, total: 0 };
    }


    ngOnInit(): void {
        this.enrollIdList = this.course.enroll?.slice(this.paginator.first, this.paginator.first + this.paginator.rows - 1) || [];
        this.enrollUsers$ = this._store.pipe(select(selectUsersAndFetchingUsers(this.enrollIdList))).pipe(map(data => {
            if (data.fetchUsers.length > 0) {
                // this._store.dispatch(fetchUsers({ users_id: data.fetchUsers }));
            }
            return data.users;
        }));


        this.paginator.total = this.course.enroll?.length || 0;
    }

    ngDoCheck(): void {
    }



    onPageOfChange(event: any) {
        this.paginator = { ...this.paginator, first: event.first };
        this.enrollUsers$ = of(this.paginator).pipe(
            switchMap(() => {
                const start = this.paginator.first;
                const end = start + this.paginator.rows;
                this.enrollIdList = this.course.enroll?.slice(start, end) || [];
                return this._store.pipe(select(selectUsersAndFetchingUsers(this.enrollIdList)));
            }),
            map((data) => {
                if (data.fetchUsers.length > 0) {
                    this._store.dispatch(fetchUsers({ users_id: data.fetchUsers }));
                }
                return data.users;
            })
        );
    }
}
