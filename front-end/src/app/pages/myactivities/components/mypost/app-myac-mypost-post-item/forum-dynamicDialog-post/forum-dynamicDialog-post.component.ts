import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../../../../models/forum/Post';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'forum-dynamic-dialog-post',
    standalone: true,
    imports: [
        CommonModule,
        EditorComponent,
    ],
    templateUrl: './forum-dynamicDialog-post.component.html',
    styleUrl: './forum-dynamicDialog-post.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumDynamicDialogPostComponent implements OnInit {

    @Input() post!: Post;




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
        this.post = this._dynamicDialogConfig.data.post
    }

}
