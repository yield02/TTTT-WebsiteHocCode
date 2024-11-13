import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../models/User';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { DialogService } from 'primeng/dynamicdialog';
import { manager_deleteUsers, manager_updateAdminRoleUsers, manager_updateStatusUsers } from '../../../../../store/admin/users/users.actions';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatbubbleSharp, ionDocumentSharp, ionWarningSharp } from '@ng-icons/ionicons';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
    selector: 'app-user-manager-item',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonModule,
        MenuModule,
        CheckboxModule,
        DropdownModule,
        AvatarModule,
        TooltipModule,
        NgIconComponent,
        ConfirmDialogModule,
        ConfirmDialogModule,

    ],
    providers: [DialogService, ConfirmationService, provideIcons({
        ionChatbubbleSharp,
        ionDocumentSharp,
        ionWarningSharp
    })],
    templateUrl: './user-manager-item.component.html',
    styleUrl: './user-manager-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagerItemComponent {
    @Input() user!: User;
    @Input() checkedAll: boolean = false;


    @Output() toggleCheckEvent: EventEmitter<{ user_id: string, state: boolean }> = new EventEmitter<{ user_id: string, state: boolean }>();

    isChecked: boolean = false;

    items: MenuItem[] | undefined;

    searchTitle: FormControl = new FormControl('');
    status: FormControl = new FormControl('');


    dropDownItems: any[] = [
        {
            label: 'Hoạt động',
            value: 'allow',
        },
        {
            label: 'cấm',
            value: 'block',
        }
    ];

    // showPostDialogRef: DynamicDialogRef | undefined;


    constructor(private _store: Store<AppState>, private dialogService: DialogService, private confirmationService: ConfirmationService) {
    }

    // showPostDialog() {
    //     this.showPostDialogRef = this.dialogService.open(
    //         ForumDynamicDialogPostComponent,
    //         {
    //             header: 'Chi tiết bài viết',
    //             width: '70%',
    //             height: '90%',
    //             data: {
    //                 post: this.user
    //             }
    //         }
    //     )

    // }

    ngOnInit(): void {
        this.status.setValue(this.user.status.status);
        let Blockitem = this.user.status != 'block' ? {
            label: 'Cấm',
            icon: 'pi pi-fw pi-ban',
            command: () => {
                this._store.dispatch(manager_updateStatusUsers({ user_ids: [this.user._id! as string], status: "block", reason: "", date: 7 }))
            },
        } : {
            label: 'Hủy cấm',
            icon: 'pi pi-fw pi-ban',
            command: () => {
                this._store.dispatch(manager_updateStatusUsers({ user_ids: [this.user._id! as string], status: "allow" }))
            },
        };

        this.items = [
            {
                label: 'Admin',
                icon: 'pi pi-fw pi-shield',
                command: () => {

                    const state = this.user.role === 'admin' ? 'member' : 'admin';

                    this._store.dispatch(manager_updateAdminRoleUsers({ user_ids: [this.user._id! as string], state }));

                },
            },
            Blockitem,
            {
                label: 'Xóa',
                icon: 'pi pi-fw pi-trash',
                command: () => {
                    this.confirmDelete();
                },
            },

        ];

        this.status.valueChanges.subscribe((status) => {
            this._store.dispatch(manager_updateStatusUsers({ user_ids: [this.user._id! as string], status: status, reason: '', date: 7 }));
        })
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
                this._store.dispatch(manager_deleteUsers({ ids: [this.user._id! as string] }));
            },
            reject: () => {
            }
        });
    }

    ngOnChanges(): void {
        this.isChecked = this.checkedAll;
    }

    toggleCheck(event: any) {
        this.toggleCheckEvent.emit({ user_id: this.user._id! as string, state: event.checked });
    }

    formatMyTime(time: string) {
        return formatDate(new Date(time), 'dd/MM/yyyy', 'vi');
    }

    ngOnDestroy(): void {

    }
}
