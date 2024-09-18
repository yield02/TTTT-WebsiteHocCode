import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ForumModule } from '../../forum.module';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'forum-comment-editor',
    standalone: true,
    imports: [
        CommonModule,
        EditorComponent,

        FormsModule,
        ButtonModule,
    ],
    templateUrl: './comment-editor.component.html',
    styleUrl: './comment-editor.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentEditorComponent {


    comment: string = '';

    initEditor: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        toolbar:
            'codesample | fontsizeinput |' +
            'bold italic|',
        autoresize_on_init: true,
        plugins: ['codesample', 'autoresize'],
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
}
