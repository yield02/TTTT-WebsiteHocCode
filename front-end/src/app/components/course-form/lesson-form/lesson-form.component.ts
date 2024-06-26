import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Editor } from 'tinymce';

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
export class LessonFormComponent {
  chapterList!: any[];
  form: FormGroup;

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

  constructor(public ref: DynamicDialogRef, private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [''],
      video: [''],
      chapter: [''],
      content: [''],
    })
    this.chapterList = [
      { name: 'Chương 1. Cài đặt môi trường làm việc và làm quen với angular', chapterId: 'NY' },
      { name: 'Chương 2. Directive', chapterId: 'RM' },
      { name: 'Chương 3. Interaction', chapterId: 'LDN' },
      { name: 'Chương 4. Two way binding', chapterId: 'IST' },
      { name: 'Chương 5. Dependency injection(DI)', chapterId: 'PRS' }
    ];
  }

  closeDialog(data: any) {
    this.ref.close(data);
  }

  submit() {
    console.log(this.form.value);
    console.log(this.content);
    this.ref.close();
  }
}
