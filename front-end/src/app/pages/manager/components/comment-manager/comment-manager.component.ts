import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { DropdownFilterOptions, DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { FilterAdminCommentInterace, selectCommentAdminWithFilter } from '../../../../store/admin/comment/comment.selectors';
import { Comment } from '../../../../models/forum/Comment';
import { User } from '../../../../models/User';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { manager_deleteComments, manager_loadComments, manager_updateStatusComments } from '../../../../store/admin/comment/comment.actions';
import { manager_loadUsers } from '../../../../store/admin/users/users.actions';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CommentManagerItemComponent } from './comment-manager-item/comment-manager-item.component';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    total: number;
}

@Component({
    selector: 'app-comment-manager',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OverlayPanelModule,
        NgIconComponent,
        DropdownModule,
        PaginatorModule,
        AvatarModule,
        ButtonModule,
        CheckboxModule,

        CommentManagerItemComponent,
    ],
    providers: [provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    templateUrl: './comment-manager.component.html',
    styleUrl: './comment-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentManagerComponent {
    paginator: PageEvent = {
        first: 0,
        rows: 10,
        page: 0,
        pageCount: 0,
        total: 100
    }

    filter$: BehaviorSubject<FilterAdminCommentInterace> = new BehaviorSubject<FilterAdminCommentInterace>({
        author: '',
        filter: { type: 'desc', fields: ['status', 'createdAt', 'like.length', 'views'] }
    });
    filterValue: string | undefined;

    isChecked: boolean = false;
    isCheckAll: boolean = false;


    actionState: {
        state: 'status' | 'delete',
        status: "allow" | "block"
    } = {
            state: 'status',
            status: 'allow',
        }
    commentCheckList: string[] = [];

    isSearching: boolean = false;
    searchAuthor: FormControl = new FormControl('');
    comments: Comment[] = [];

    users$: Observable<User[]> = this._store.select(state => state.admin_user);


    loadComments: boolean = false;


    constructor(private _store: Store<AppState>, private _changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {
        if (!this.loadComments) {
            this._store.dispatch(manager_loadComments());
            this._store.dispatch(manager_loadUsers())

        }


        this.filter$.pipe(
            switchMap(filter => this._store.pipe(select(selectCommentAdminWithFilter(filter))))
        ).subscribe(comments => {
            if (comments.length > 0) {
                this.paginator.total = comments.length;
                this.paginator.pageCount = Math.ceil(comments.length / this.paginator.rows);
            }
            this.comments = comments || [];
            this._changeDetectorRef.detectChanges();
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
            this._store.dispatch(manager_updateStatusComments({ comment_ids: this.commentCheckList, status: this.actionState.status }));
        }
        else if (this.actionState.state == 'delete') {
            this._store.dispatch(manager_deleteComments({ ids: this.commentCheckList }));
        }
    }

    toggleCheckComment(event: { comment_id: string, state: boolean }) {
        if (event.state) {
            this.commentCheckList.push(event.comment_id);
        }
        else {
            this.commentCheckList = this.commentCheckList.filter(id => id !== event.comment_id);
        }
        if (this.commentCheckList.length === this.comments.length) {
            this.isChecked = true;
            this.isCheckAll = this.commentCheckList.length === this.comments.length;
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
            this.commentCheckList = this.comments.map(comment => comment._id!) || [];
            this._changeDetectorRef.detectChanges();
        }
        else {
            this.isCheckAll = false;
            this.commentCheckList = [];
        }
    }

    ngOnDestroy(): void {
        this.filter$.complete();
    }
}
