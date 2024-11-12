import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, type OnInit } from '@angular/core';
import { Post } from '../../../../../models/forum/Post';

import vi from '@angular/common/locales/vi';
registerLocaleData(vi);

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionEyeOutline, ionHeart, ionHeartOutline } from '@ng-icons/ionicons';
import { ButtonModule } from 'primeng/button';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store/reducer';
import { Observable, Subject } from 'rxjs';
import { Topic } from '../../../../../models/forum/Topic';
import { selectTopic } from '../../../../../store/forum/topic/topic.selectors';
import { RouterLink } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ForumDynamicDialogPostComponent } from './forum-dynamicDialog-post/forum-dynamicDialog-post.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { deletePost, toggleBlockComment, toggleHiddenPost } from '../../../../../store/forum/post/post.actions';
import { MenuModule } from 'primeng/menu';




@Component({
    selector: 'app-myac-mypost-post-item',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        ButtonModule,
        RouterLink,
        ConfirmDialogModule,
        MenuModule,
    ],
    providers: [provideIcons({
        ionHeartOutline,
        ionEyeOutline
    }), DialogService, ConfirmationService],
    templateUrl: './app-myac-mypost-post-item.component.html',
    styleUrl: './app-myac-mypost-post-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppMyacMypostPostItemComponent implements OnInit {
    @Input() post!: Post;
    @Input() index!: number;

    topic$!: Observable<Topic | undefined>

    showPostDialogRef: DynamicDialogRef | undefined;

    moreActions: MenuItem[] = [];


    constructor(
        private _store: Store<AppState>,
        private dialogService: DialogService,
        private _confirmationService: ConfirmationService,
    ) { }
    ngOnInit(): void {
        this.topic$ = this._store.pipe(select(selectTopic(this.post.topic!)));


        if (!this.post.manager?.block_comment) {
            this.moreActions.push({
                label: 'Khóa bình luận',
                icon: 'pi pi-lock',
                command: () => {
                    this._store.dispatch(toggleBlockComment({ post_id: this.post.post_id?.toString()! }));

                }
            });
        }
        else {
            this.moreActions.push({
                label: 'Mở bình luận',
                icon: 'pi pi-unlock',
                command: () => {
                    this._store.dispatch(toggleBlockComment({ post_id: this.post.post_id?.toString()! }));
                }
            });
        }

        if (!this.post.manager?.hidden) {
            this.moreActions.push({
                label: 'Ẩn bài viết',
                icon: 'pi pi-eye-slash',
                command: () => {
                    this._store.dispatch(toggleHiddenPost({ post_id: this.post.post_id?.toString()! }));

                }
            });
        }
        else {
            this.moreActions.push({
                label: 'Hiện bài viết',
                icon: 'pi pi-eye',
                command: () => {
                    this._store.dispatch(toggleHiddenPost({ post_id: this.post.post_id?.toString()! }));
                }
            });
        }


    }



    formatMyTime(time: string) {
        return formatDate(new Date(time), 'dd/MM/yyyy HH:mm', 'vi');
    }

    showStatus(status: string) {

        const localStatus = this.post.manager?.hidden ? "Ẩn" : "Công khai";

        switch (status) {
            case 'waiting':
                return 'Chờ duyệt' + ' - ' + localStatus;
            case 'allow':
                return 'Đã duyệt' + ' - ' + localStatus;
            case 'block':
                return 'Bị khóa' + ' - ' + localStatus;
            default:
                return 'Không xác định';
        }
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

    confirmDelete(event: Event) {
        this._confirmationService.confirm({
            message: 'Bạn có chắc chắn muốn xóa bài viết?',
            header: 'Xác nhận',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-outlined",
            rejectButtonStyleClass: "p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",
            acceptLabel: 'Xóa',
            rejectLabel: 'Hủy',
            dismissableMask: true,
            accept: () => {
                this._store.dispatch(deletePost({ post_id: this.post.post_id! }));
            },
            reject: () => {
            }
        });
    }

}
