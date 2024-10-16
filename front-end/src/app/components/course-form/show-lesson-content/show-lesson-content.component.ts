import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../../../models/Lesson';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';

@Component({
    selector: 'study-show-lesson-content',
    standalone: true,
    imports: [
        CommonModule,
        YouTubePlayerModule,
        EditorModule,
        EditorComponent,
    ],
    templateUrl: './show-lesson-content.component.html',
    styleUrl: './show-lesson-content.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowLessonContentComponent implements OnInit {
    @Input() lesson!: Lesson;

    content: String = '';


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

    constructor(private _dynamicDialogConfig: DynamicDialogConfig) {
    }

    ngOnInit(): void {
        this.lesson = this._dynamicDialogConfig.data.lesson;
        this.content = this.lesson.content || '';
    }

}
