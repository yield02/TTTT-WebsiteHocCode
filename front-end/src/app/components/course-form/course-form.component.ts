import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Course } from '../../models/Course';
import { CourseManagerService } from '../../services/course-manger.service';
import { Add } from '../../store/mycoursemanager/mycoursemanager.actions';
import { Store } from '@ngrx/store';
import { Update } from '../../store/mycoursemanager/mycoursemanager.actions';



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
export class CourseFormComponent implements OnInit, OnDestroy {

  @Input() course?: Course | null
    = {
      _id: '',
      course_name: '',
      description: ''
    };
  chapterList: Chapter[];

  form!: FormGroup;
  lessonFormRef: DynamicDialogRef | undefined;
  chapterFormRef: DynamicDialogRef | undefined;

  constructor(private fb: FormBuilder, private dialogService: DialogService, private courseManagerService: CourseManagerService, private courseManagerStore: Store) {
    console.log(this.course);


    this.chapterList = this.chapterList = [
      {
        _id: '1',
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
        _id: '2',
        title: 'Chapter 2',
        content: []
      },
      {
        _id: '3',
        title: 'Chapter 3',
        content: []
      }
    ];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: [this.course?._id],
      course_name: [this.course?.course_name, Validators.compose([Validators.required, Validators.minLength(6)])],
      description: [this.course?.description, Validators.compose([Validators.required, Validators.minLength(20)])],
      image: [this.course?.image || null, Validators.compose([Validators.required])],
    });
    console.log(this.form.value);
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
  upLoadImage(event: any) {
    const file = event.currentFiles?.[0];
    this.form.patchValue({ image: file });
  }


  onSubmit() {
    let fb = new FormData();
    fb.append('image', this.form.value.image);
    fb.append('course_name', this.form.value.course_name);
    fb.append('description', this.form.value.description);
    if (!this.course?._id) {
      this.courseManagerService.createCourse(fb).subscribe(({ course }) => {
        this.course = {
          _id: course._id,
          course_name: course.course_name,
          description: course.description,
          image: course.image
        }
        this.courseManagerStore.dispatch(Add({ courses: [course] }))
      });
    }
    else {
      fb.append('_id', this.course._id.toString());
      this.courseManagerService.updateCourse(fb).subscribe(({ course }) => {
        this.courseManagerStore.dispatch(Update({ course: course }))
      });
    }
  }

}
