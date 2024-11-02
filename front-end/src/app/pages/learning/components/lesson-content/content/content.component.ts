import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatbubblesOutline } from '@ng-icons/ionicons';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CommentDialogComponent } from '../CommentDialog/CommentDialog.component';

@Component({
    selector: 'learning-lesson-content-box',
    standalone: true,
    imports: [
        CommonModule,

        NgIconComponent
    ],
    providers: [provideIcons({ ionChatbubblesOutline }), DialogService]
    ,
    templateUrl: './content.component.html',
    styleUrl: './content.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
    @Input() lesson_id!: String;


    isComment: Boolean = false;
    commentDialogRef: DynamicDialogRef | undefined;


    constructor(public dialogService: DialogService) {

    }

    showCommentDialog() {
        this.commentDialogRef = this.dialogService.open(CommentDialogComponent, {
            data: {
                lesson_id: this.lesson_id
            },
            position: 'left',
            header: "Thảo luận",
            width: '70vw',
            height: '80vh',
            baseZIndex: 1000,
            style: { padding: '32px' },
            breakpoints: {
                "1024px": '80vw',
                "768px": '100vw',

            }
        });
    }




}
