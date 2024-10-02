import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionSendOutline } from '@ng-icons/ionicons';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
    selector: 'app-comment-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NgIconComponent,

        EditorComponent
    ],
    providers: [provideIcons({ ionSendOutline }), { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }],
    templateUrl: `./comment-editor.component.html`,
    styleUrl: './Comment-editor.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentEditorComponent {

    @Input() comment: String = '';

    @Output() submit: EventEmitter<String> = new EventEmitter<String>();


    initEditor: EditorComponent['init'] = {
        base_url: '/tinymce',
        suffix: '.min',
        menubar: false,
        statusbar: false,
        toolbar:
            'codesample | fontsizeinput |' +
            'bold italic|',
        autoresize_on_init: true,
        plugins: [
            'image',
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
            'codesample',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
            'autoresize',],
        placeholder: 'Nhập bình luận của bạn...',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        font_size_input_default_unit: 'px',
        init_instance_callback: (editor) => {
            editor.container.querySelector('.tox-editor-header')?.classList.add('!hidden');
            editor.on('focus', () => {
                editor.container.querySelector('.tox-editor-header')?.classList.remove('!hidden');
            });
            editor.on('blur', () => {
                editor.container.querySelector('.tox-editor-header')?.classList.add('!hidden');
            });
        }
    }

    constructor() {

    }

    submitComment() {
        this.submit.emit(this.comment);
        this.comment = '';
    }


}
