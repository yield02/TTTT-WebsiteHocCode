import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '../../../../../models/forum/Comment';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-show-comment-dialog',
    standalone: true,
    imports: [
        CommonModule,
        EditorComponent,
    ],
    templateUrl: './show-comment-dialog.component.html',
    styleUrl: './show-comment-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCommentDialogComponent {
    @Input() comment!: Comment;




    initEditor: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        toolbar: false,
        editable_root: false,
        base_url: '/tinymce',
        suffix: '.min',
        resize: 'both',
        autoresize_on_init: true,
        plugins: ['image',
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'codesample',
            'autoresize'
        ],
    }

    constructor(private _dynamicDialogRef: DynamicDialogRef, private _dynamicDialogConfig: DynamicDialogConfig) {

    }

    ngOnInit(): void {
        this.comment = this._dynamicDialogConfig.data.comment
    }
}
