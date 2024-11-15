import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { BehaviorSubject, debounceTime, Observable, switchMap } from 'rxjs';
import { FilterAdminCourseInterace, selectCourseAdminWithFilter } from '../../../../store/admin/course/course.selectors';
import { Course } from '../../../../models/Course';
import { User } from '../../../../models/User';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { manager_loadPosts } from '../../../../store/admin/post/post.actions';
import { manager_loadUsers } from '../../../../store/admin/users/users.actions';
import { manager_deleteCourses, manager_loadCourses, manager_loadLessons, manager_updateStatusCourses } from '../../../../store/admin/course/course.actions';
import { manager_loadReports } from '../../../../store/admin/report/report.actions';
import { CourseManagerItemComponent } from './course-manager-item/course-manager-item.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}

@Component({
    selector: 'app-course-manager',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OverlayPanelModule,
        NgIconComponent,
        DropdownModule,
        PaginatorModule,
        CheckboxModule,
        AvatarModule,
        ButtonModule,

        CourseManagerItemComponent,

    ],
    providers: [DialogService, ConfirmationService, provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    templateUrl: './course-manager.component.html',
    styleUrl: './course-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseManagerComponent {

    paginator: PageEvent = {
        first: 0,
        rows: 10,
        page: 0,
        pageCount: 0,
        total: 0
    }

    filter$: BehaviorSubject<FilterAdminCourseInterace> = new BehaviorSubject<FilterAdminCourseInterace>({
        course_name: '',
        subject_id: 'all',
        author: '',
        filter: { type: 'desc', fields: ['status.state', 'createdAt', 'enroll'] }
    });
    filterValue: string | undefined;

    isChecked: boolean = false;
    isCheckAll: boolean = false;


    actionState: {
        state: 'status' | 'delete',
        status: 'waiting' | "active" | "banned"
    } = {
            state: 'status',
            status: 'waiting',
        }
    courseCheckList: string[] = [];

    isSearching: boolean = false;
    searchCourseName: FormControl = new FormControl('');
    courses: Course[] = [];

    users$: Observable<User[]> = this._store.select(state => state.admin_user);


    loadPost: boolean = false;


    constructor(private _store: Store<AppState>, private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        if (!this.loadPost) {
            this._store.dispatch(manager_loadPosts());
            this._store.dispatch(manager_loadUsers())
            this._store.dispatch(manager_loadLessons())
            this._store.dispatch(manager_loadReports());
            this._store.dispatch(manager_loadCourses());
        }


        this.filter$.pipe(
            switchMap(filter => this._store.pipe(select(selectCourseAdminWithFilter(filter))))
        ).subscribe(courses => {
            if (courses.length > 0) {
                this.paginator.total = courses.length;
                this.paginator.pageCount = Math.ceil(courses.length / this.paginator.rows);
            }
            this.courses = courses || [];
            this._changeDetectorRef.detectChanges();
        });

        this.searchCourseName.valueChanges.pipe(debounceTime(500)).subscribe(
            value => {
                this.filter$.next({
                    ...this.filter$.value,
                    course_name: value
                })
            })

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

    authorFilterChange(event: any) {
        this.filter$.next({
            ...this.filter$.value,
            author: event.value || ''
        });
        console.log(event.value);
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
            this._store.dispatch(manager_updateStatusCourses({ course_ids: this.courseCheckList, status: this.actionState.status }));
        }
        else if (this.actionState.state == 'delete') {
            this._store.dispatch(manager_deleteCourses({ ids: this.courseCheckList }));
        }
    }

    toggleCheckCourse(event: { course_id: string, state: boolean }) {
        if (event.state) {
            this.courseCheckList.push(event.course_id);
        }
        else {
            this.courseCheckList = this.courseCheckList.filter(id => id !== event.course_id);
        }
        if (this.courseCheckList.length === this.courses.length) {
            this.isChecked = true;
            this.isCheckAll = this.courseCheckList.length === this.courses.length;
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
            this.courseCheckList = this.courses.map(Course => Course._id! as string) || [];
            this._changeDetectorRef.detectChanges();
        }
        else {
            this.isCheckAll = false;
            this.courseCheckList = [];
        }
    }

    ngOnDestroy(): void {
        this.filter$.complete();
    }





}
