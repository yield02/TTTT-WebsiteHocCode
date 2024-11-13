import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from '../../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { selectAdminUserWithId } from '../../../../../store/admin/users/users.selectors';
import { Comment } from '../../../../../models/forum/Comment';
import { User } from '../../../../../models/User';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { manager_deleteComments, manager_updateStatusComments } from '../../../../../store/admin/comment/comment.actions';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Post } from '../../../../../models/forum/Post';
import { selectPostWithPostId } from '../../../../../store/forum/post/post.selectors';
import { ShowCommentDialogComponent } from '../show-comment-dialog/show-comment-dialog.component';

@Component({
    selector: 'app-comment-manager-item',
    standalone: true,
    imports: [
        CommonModule,
        AvatarModule,
        DropdownModule,
        CheckboxModule,
        ButtonModule,
        MenuModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [DialogService],
    templateUrl: './comment-manager-item.component.html',
    styleUrl: './comment-manager-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentManagerItemComponent {

    @Input() comment!: Comment;


    @Input() checkedAll: boolean = false;


    isChecked: boolean = false;

    author$!: Observable<User | undefined>;
    items: MenuItem[] | undefined;


    status: FormControl = new FormControl('');

    @Output() toggleCheckEvent: EventEmitter<{ comment_id: string, state: boolean }> = new EventEmitter<{ comment_id: string, state: boolean }>();

    dropDownItems: any[] = [
        {
            label: 'cho phép',
            value: 'allow',
        },
        {
            label: 'cấm',
            value: 'block',
        }
    ];

    showCommentDialogRef: DynamicDialogRef | undefined;


    constructor(private _store: Store<AppState>, private dialogService: DialogService) {
    }



    ngOnInit(): void {


        this.author$ = this._store.pipe(select(selectAdminUserWithId(this.comment.author_id!)))
        this.status.setValue(this.comment.status);

        let Blockitem = this.comment.status != 'block' ? {
            label: 'Cấm',
            icon: 'pi pi-fw pi-ban',
            command: () => {
                this._store.dispatch(manager_updateStatusComments({ comment_ids: [this.comment._id!], status: "block" }))
            },
        } : {
            label: 'Hủy cấm',
            icon: 'pi pi-fw pi-ban',
            command: () => {
                this._store.dispatch(manager_updateStatusComments({ comment_ids: [this.comment._id!], status: "allow" }))
            },
        };

        this.items = [
            {
                label: 'Xem',
                icon: 'pi pi-fw pi-search',
                command: () => {
                    this.showCommentDialog();
                },
            },
            Blockitem,
            {
                label: 'Xóa',
                icon: 'pi pi-fw pi-trash',
                command: () => {
                    this._store.dispatch(manager_deleteComments({ ids: [this.comment._id!] }));
                },
            },

        ];

        this.status.valueChanges.subscribe((status) => {
            this._store.dispatch(manager_updateStatusComments({ comment_ids: [this.comment._id!], status: status }));
        })
    }

    ngOnChanges(): void {
        this.isChecked = this.checkedAll;
    }

    showCommentDialog() {
        this.showCommentDialogRef = this.dialogService.open(
            ShowCommentDialogComponent,
            {
                header: 'Chi tiết bình luận',
                width: '70%',
                height: '90%',
                data: {
                    comment: this.comment
                }
            }
        )

    }

    toggleCheck(event: any) {
        this.toggleCheckEvent.emit({ comment_id: this.comment._id!, state: event.checked });
    }

    formatMyTime(time: string) {
        return formatDate(new Date(time), 'dd/MM/yyyy HH:mm', 'vi');
    }

    ngOnDestroy(): void {
        this.showCommentDialogRef?.close();
    }
}
