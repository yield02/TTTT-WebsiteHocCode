import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HttpClientModule } from '@angular/common/http';
import { OrderListModule } from 'primeng/orderlist';
import { Chapter } from '../../models/Chapter';
import { FieldsetModule } from 'primeng/fieldset';
import { LessonComponent } from './lesson/lesson.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { ChapterFormComponent } from './chapter-form/chapter-form.component';



@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    HttpClientModule,
    OrderListModule,
    FieldsetModule,

    LessonComponent,
    LessonFormComponent,
    ChapterFormComponent
  ],
  providers: [DialogService],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent implements OnDestroy {


  chapterList: Chapter[];

  form: FormGroup;
  lessonFormRef: DynamicDialogRef | undefined;
  chapterFormRef: DynamicDialogRef | undefined;

  constructor(private fb: FormBuilder, private dialogService: DialogService) {
    this.form = this.fb.group({
      title: [''],
      description: ['']
    })
    this.chapterList = this.chapterList = [
      {
        id: 1,
        title: '1. Bắt đầu làm quen với IDE và cài đặt môi trường làm việc',
        content: [
          {
            _id: '12324',
            title: '1. Bắt đầu làm quen với IDE và cài đặt môi trường làm việc',
            video: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
            content: {}
          }
        ]
      },
      {
        id: 2,
        title: 'Chapter 2',
        content: []
      },
      {
        id: 3,
        title: 'Chapter 3',
        content: []
      }
    ];
  }

  showLessonForm() {
    this.lessonFormRef = this.dialogService.open(LessonFormComponent, {
      header: 'Thêm bài học'
    });

  }

  showChapterForm() {
    this.chapterFormRef = this.dialogService.open(ChapterFormComponent, { header: 'Thêm chương' })
  }

  getOrder(event: any) {
    console.log(event);
    console.log(this.chapterList);
  }

  ngOnDestroy(): void {
    if (this.lessonFormRef) {
      this.lessonFormRef.close();
    }
  }
}
