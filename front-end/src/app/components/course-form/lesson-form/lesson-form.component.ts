import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Editor } from 'tinymce';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { selectChaptersMangerFromCourseId } from '../../../store/chapters/chapters.selectors';
import { Observable } from 'rxjs';
import { Chapter } from '../../../models/Chapter';
import { Lesson } from '../../../models/Lesson';

@Component({
  selector: 'course-form-lesson-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    EditorComponent,
    ReactiveFormsModule,
    DropdownModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  templateUrl: './lesson-form.component.html',
  styleUrl: './lesson-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonFormComponent implements OnInit {
  initValue: String = '';
  chapterList!: Observable<Chapter[]>;
  form!: FormGroup;
  lesson?: Lesson;

  content: EditorComponent['init'] = {
    menubar: false,
    statusbar: false,
    resize: true,
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
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
    ],
    toolbar:
      'undo redo | fontsizeinput | fontfamily |' +
      'bold italic forecolor backcolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' + '| image |' +
      'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    font_size_input_default_unit: 'px',
  }

  constructor(public ref: DynamicDialogRef, private fb: FormBuilder, private _dialogConfig: DynamicDialogConfig, private _store: Store<AppState>) {


  }

  ngOnInit(): void {
    if (this._dialogConfig?.data?.course_id) {
      this.chapterList = this._store.pipe(select(selectChaptersMangerFromCourseId(this._dialogConfig.data?.course_id)));
    }

    if (this._dialogConfig?.data?.lesson) {
      this.lesson = this._dialogConfig?.data?.lesson

    }

    if (this.lesson) {
      const content = this.lesson!.content!.toString();
      this.form = this.fb.group({
        title: [this.lesson.title],
        video: [this.lesson.video],
        chapter_id: [this.lesson = this._dialogConfig?.data?.chapter_id],
        content: [content],
      })
    }
    else {
      this.form = this.fb.group({
        title: [''],
        video: [''],
        chapter_id: [''],
        content: [''],
      })
    }

  }

  closeDialog(data: any) {
    this.ref.close();
  }

  submit() {
    this.ref.close({
      title: this.form.value.title,
      video: this.form.value.video,
      chapter_id: this.form.value.chapter_id,
      content: this.form.value.content
    });
  }
}
