import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'forum-post-form',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        EditorComponent,

    ],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent {

    editorInit: EditorComponent['init'] = {
        menubar: false,
        statusbar: false,
        resize: true,
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
            'autoresize',
        ],
        toolbar:
            'codesample | undo redo | fontsizeinput | fontfamily |' +
            'bold italic forecolor backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' + '| image |' +
            'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        font_size_input_default_unit: 'px',
    }

}
