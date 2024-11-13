import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { ManagerPostItemComponent } from './manager-post-item/manager-post-item.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { manager_deletePosts, manager_loadPosts, manager_updateStatusPost } from '../../../../store/admin/post/post.actions';
import { manager_loadUsers } from '../../../../store/admin/users/users.actions';
import { Post } from '../../../../models/forum/Post';
import { BehaviorSubject, debounceTime, Observable, switchMap } from 'rxjs';
import { FilterAdminPostInterace, selectAdminPostWithId, selectPostAdminWithFilter } from '../../../../store/admin/post/post.selectors';
import { User } from '../../../../models/User';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';


interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}

@Component({
    selector: 'app-post-manager',
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

        ManagerPostItemComponent,
    ],
    providers: [provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    templateUrl: './post-manager.component.html',
    styleUrl: './post-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostManagerComponent implements OnInit, OnDestroy {

    paginator: PageEvent = {
        first: 0,
        rows: 10,
        page: 0,
        pageCount: 0,
        total: 100
    }

    filter$: BehaviorSubject<FilterAdminPostInterace> = new BehaviorSubject<FilterAdminPostInterace>({
        search: '',
        topic: 'all',
        author: '',
        filter: { type: 'desc', fields: ['status', 'createdAt', 'like.length', 'views'] }
    });
    filterValue: string | undefined;

    isChecked: boolean = false;
    isCheckAll: boolean = false;


    actionState: {
        state: 'status' | 'delete',
        status: 'waiting' | "allow" | "block"
    } = {
            state: 'status',
            status: 'waiting',
        }
    postCheckList: string[] = [];

    isSearching: boolean = false;
    searchPost: FormControl = new FormControl('');
    posts: Post[] = [];

    users$: Observable<User[]> = this._store.select(state => state.admin_user);


    loadPost: boolean = false;


    constructor(private _store: Store<AppState>, private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        if (!this.loadPost) {
            this._store.dispatch(manager_loadPosts());
            this._store.dispatch(manager_loadUsers())

        }


        this.filter$.pipe(
            switchMap(filter => this._store.pipe(select(selectPostAdminWithFilter(filter))))
        ).subscribe(posts => {
            if (posts.length > 0) {
                this.paginator.total = posts.length;
                this.paginator.pageCount = Math.ceil(posts.length / this.paginator.rows);
            }
            this.posts = posts || [];
            this._changeDetectorRef.detectChanges();
        });

        this.searchPost.valueChanges.pipe(debounceTime(500)).subscribe(
            value => {
                this.filter$.next({
                    ...this.filter$.value,
                    search: value
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
            this._store.dispatch(manager_updateStatusPost({ post_ids: this.postCheckList, status: this.actionState.status }));
        }
        else if (this.actionState.state == 'delete') {
            this._store.dispatch(manager_deletePosts({ ids: this.postCheckList }));
        }
    }

    toggleCheckPost(event: { post_id: string, state: boolean }) {
        if (event.state) {
            this.postCheckList.push(event.post_id);
        }
        else {
            this.postCheckList = this.postCheckList.filter(id => id !== event.post_id);
        }
        if (this.postCheckList.length === this.posts.length) {
            this.isChecked = true;
            this.isCheckAll = this.postCheckList.length === this.posts.length;
        }
        else {
            this.isChecked = false;
        }
    }

    checkAll(event: any) {
        this.isChecked = event.checked;
        if (event.checked == true) {
            console.log('vo day');
            this.isCheckAll = true;
            this.isChecked = true;
            this.postCheckList = this.posts.map(post => post._id!) || [];
            this._changeDetectorRef.detectChanges();
        }
        else {
            this.isCheckAll = false;
            this.postCheckList = [];
        }
    }

    ngOnDestroy(): void {
        this.filter$.complete();
    }
}



