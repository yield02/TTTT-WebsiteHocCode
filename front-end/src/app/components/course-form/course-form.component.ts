import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Observable, of, switchMap, take, tap } from 'rxjs';
import { ChapterService } from '../../services/chapter.service';
import { Router } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { AppState } from '../../store/reducer';
import { CreateChapter } from '../../store/chapters/chapters.actions';
import { CreateLessonInterface, Lesson } from '../../models/Lesson';
import { CreateLesson } from '../../store/lessons/lessons.actions';
import { Subject } from '../../models/Subject';
import { fetchingSubjects } from '../../store/subjects/subjects.actions';
import { DropdownModule } from 'primeng/dropdown';



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
    ToastModule,
    DropdownModule,

    ChapterListComponent,
    LessonFormComponent,
    ChapterFormComponent
  ],
  providers: [DialogService, MessageService],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseFormComponent implements OnInit, OnDestroy, OnChanges {

  @Input() course?: Course | null
    = {
      _id: '',
      course_name: '',
      description: '',
      subject_id: '',

    };

  form!: FormGroup;
  lessonFormRef: DynamicDialogRef | undefined;
  chapterFormRef: DynamicDialogRef | undefined;
  fetched: Boolean = false;
  subjects!: Observable<Subject[]>;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private courseManagerService: CourseManagerService,
    private store: Store<AppState>,
    private messageService: MessageService,
    private router: Router,
  ) {


  }

  ngOnChanges(change: any): void {

    if (this.course?._id) {
      this.form?.patchValue({
        _id: this.course?._id,
        course_name: this.course?.course_name,
        description: this.course?.description,
        image: this.course?.image || null,
        subject_id: this.course?.subject_id,
      })
    }
  }

  ngOnInit(): void {
    this.subjects = this.store.select(state => state.subjects).pipe(tap(subjects => {
      if (!this.fetched && subjects.length <= 0) {
        this.store.dispatch(fetchingSubjects());
        this.fetched = true;
      }
    }));

    this.form = this.fb.group({
      _id: [this.course?._id],
      course_name: [this.course?.course_name, Validators.compose([Validators.required, Validators.minLength(6)])],
      description: [this.course?.description, Validators.compose([Validators.required, Validators.minLength(20)])],
      image: [this.course?.image || null, Validators.compose([Validators.required])],
      subject_id: [this.course?.subject_id],
    });
  }

  showLessonForm() {
    this.lessonFormRef = this.dialogService.open(LessonFormComponent, {
      header: 'Thêm bài học',
      data: {
        course_id: this.course?._id
      }
    },);
    this.lessonFormRef.onClose.pipe(switchMap((lesson) => {
      if (lesson) {
        const data: CreateLessonInterface = {
          chapter_id: lesson.chapter_id,
          course_id: this.course?._id!,
          title: lesson.title,
          content: lesson.content,
          video: lesson.video
        }
        this.store.dispatch(CreateLesson({ createLesson: data }))
      }
      return of(null);
    })).subscribe();

  }

  showChapterForm() {
    this.chapterFormRef = this.dialogService.open(ChapterFormComponent, { header: 'Thêm chương' });
    this.chapterFormRef.onClose.pipe(switchMap((chapterTitle: String) => {
      if (chapterTitle) {
        const data = {
          course_id: this.course!._id!,
          title: chapterTitle,
        }
        this.store.dispatch(CreateChapter({ createChapter: data }));
      }
      return of(null);
    })).subscribe();
  }



  ngOnDestroy(): void {
    if (this.lessonFormRef) {
      this.lessonFormRef.close();
    }
    if (this.chapterFormRef) {
      this.chapterFormRef.close();
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
    fb.append('subject_id', this.form.value.subject_id);
    console.log(this.form.value.subject_id);
    // create course
    if (!this.course?._id) {
      this.courseManagerService.createCourse(fb).subscribe(({ course }) => {
        this.store.dispatch(Add({ courses: [course] }))
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Tạo khóa học thành công' })
        setTimeout(() => { this.router.navigate([`/myactivities/mycourses/edit/${course._id}`]); }, 500);
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Tạo khóa học thất bại' })
      });
    }
    // update course  if have _id  in course object  else create new course  in store  and courseManagerService  for update course in database  and store in local storage  and state management  in ngrx/store  and firestore/firebase  or mongodb  or any other database  or local storage  or memory  or any other data storage solution  or any other data storage solution  or any other data storage solution  or any other data storage solution
    else {
      fb.append('_id', this.course._id.toString());
      this.courseManagerService.updateCourse(fb).subscribe(({ course }) => {
        this.course = { ...course };
        this.store.dispatch(Update({ course: course }))
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật khóa học thành công' })
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Cập nhật khóa học thất bại' })
      });
    }
  }

}
