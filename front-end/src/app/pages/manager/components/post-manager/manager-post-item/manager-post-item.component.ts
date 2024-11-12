import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { Post } from '../../../../../models/forum/Post';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { Observable } from 'rxjs';
import { User } from '../../../../../models/User';
import { selectAdminUserWithId } from '../../../../../store/admin/users/users.selectors';

import vi from '@angular/common/locales/vi';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ForumDynamicDialogPostComponent } from '../../../../myactivities/components/mypost/app-myac-mypost-post-item/forum-dynamicDialog-post/forum-dynamicDialog-post.component';
import { manager_deletePosts, manager_updateStatusPost } from '../../../../../store/admin/post/post.actions';
registerLocaleData(vi);

@Component({
    selector: 'app-manager-post-item',
    standalone: true,
    imports: [
        CommonModule,
        CheckboxModule,
        AvatarModule,
        ButtonModule,
        MenuModule,
        DropdownModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [DialogService],
    templateUrl: './manager-post-item.component.html',
    styleUrl: './manager-post-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerPostItemComponent implements OnInit, OnDestroy, OnChanges {

    @Input() post!: Post;
    @Input() checkedAll: boolean = false;


    isChecked: boolean = false;

    author$!: Observable<User | undefined>;
    items: MenuItem[] | undefined;

    searchTitle: FormControl = new FormControl('');
    status: FormControl = new FormControl('');

    @Output() toggleCheckEvent: EventEmitter<{ post_id: string, state: boolean }> = new EventEmitter<{ post_id: string, state: boolean }>();

    dropDownItems: any[] = [{
        label: 'chưa duyệt',
        value: 'waiting',
    },
    {
        label: 'đã duyệt',
        value: 'allow',
    },
    {
        label: 'cấm',
        value: 'block',
    }
    ];

    showPostDialogRef: DynamicDialogRef | undefined;


    constructor(private _store: Store<AppState>, private dialogService: DialogService) {
    }

    showPostDialog() {
        this.showPostDialogRef = this.dialogService.open(
            ForumDynamicDialogPostComponent,
            {
                header: 'Chi tiết bài viết',
                width: '70%',
                height: '90%',
                data: {
                    post: this.post
                }
            }
        )

    }

    ngOnInit(): void {
        this.author$ = this._store.pipe(select(selectAdminUserWithId(this.post.author_id!)))
        this.status.setValue(this.post.status);

        let Blockitem = this.post.status != 'block' ? {
            label: 'Cấm',
            icon: 'pi pi-fw pi-ban',
            command: () => {
                this._store.dispatch(manager_updateStatusPost({ post_ids: [this.post._id!], status: "block" }))
            },
        } : {
            label: 'Hủy cấm',
            icon: 'pi pi-fw pi-ban',
            command: () => {
                this._store.dispatch(manager_updateStatusPost({ post_ids: [this.post._id!], status: "allow" }))
            },
        };

        this.items = [
            {
                label: 'Xem',
                icon: 'pi pi-fw pi-search',
                command: () => {
                    this.showPostDialog();
                },
            },
            Blockitem,
            {
                label: 'Xóa',
                icon: 'pi pi-fw pi-trash',
                command: () => {
                    this._store.dispatch(manager_deletePosts({ ids: [this.post._id!] }));
                },
            },

        ];

        this.status.valueChanges.subscribe((status) => {
            this._store.dispatch(manager_updateStatusPost({ post_ids: [this.post._id!], status: status }));
        })
    }

    ngOnChanges(): void {
        this.isChecked = this.checkedAll;
    }

    toggleCheck(event: any) {
        this.toggleCheckEvent.emit({ post_id: this.post._id!, state: event.checked });
    }

    formatMyTime(time: string) {
        return formatDate(new Date(time), 'dd/MM/yyyy HH:mm', 'vi');
    }

    ngOnDestroy(): void {

    }
}
