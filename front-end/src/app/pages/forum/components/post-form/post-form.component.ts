import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Hashtag } from '../../../../models/forum/Hashtag';
import { createPost } from '../../../../store/forum/post/post.actions';
import { Post } from '../../../../models/forum/Post';

@Component({
    selector: 'forum-post-form',
    standalone: true,
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        MultiSelectModule,
        EditorComponent,
        ReactiveFormsModule,


    ],
    templateUrl: './post-form.component.html',
    styleUrl: './post-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {
    @Input() post?: Post | null;


    @Output() submitPost: EventEmitter<Post> = new EventEmitter<Post>();



    postForm!: FormGroup;

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

    hashtags$: Observable<Hashtag[]> = this._store.select(state => state.hashtag);


    constructor(private fb: FormBuilder, private _store: Store<AppState>) {


    }

    ngOnInit(): void {

        if (this.post?._id) {
            this.postForm = this.fb.group({
                title: [this.post.title],
                content: [this.post.content],
                hashtags: [this.post.hashtags],
            });
        }
        else {
            this.postForm = this.fb.group({
                title: [''],
                content: [''],
                hashtags: [],
            });
        }
        // this.hashtags = ['#trogiup', '#thaoluan', '#tintuc']
    }



    submit() {
        this.submitPost.emit({
            ...this.post,
            ...this.postForm.value
        });
    }

}
