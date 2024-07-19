import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { ButtonModule } from 'primeng/button';
import { Lesson, UpdateLessonInterface } from '../../../models/Lesson';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HoursFormatPipe } from '../../../pipe/my-datetime-format.pipe';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LessonFormComponent } from '../lesson-form/lesson-form.component';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { DeleteLesson, UpdateLesson } from '../../../store/lessons/lessons.actions';


@Component({
  selector: 'course-form-lesson',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ButtonModule,
    ConfirmDialogModule,

    HoursFormatPipe
  ],
  providers: [provideIcons({ bootstrapPersonVideo, ionDocumentTextOutline }), ConfirmationService],
  templateUrl: `./lesson.component.html`,
  styleUrl: './lesson.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit {
  @Input() lesson!: Lesson;
  @Input() chapter_id!: String;
  @Input() course_id!: String;

  lessonFormRef: DynamicDialogRef | undefined;

  constructor(private confirmationService: ConfirmationService, private dialogService: DialogService, private _store: Store<AppState>) {
  }

  ngOnInit(): void {
  }



  showEditDialog() {
    this.lessonFormRef = this.dialogService.open(LessonFormComponent, {
      header: 'Chỉnh sửa bài học',
      data: {
        lesson: this.lesson,
        course_id: this.course_id,
        chapter_id: this.chapter_id
      }
    },)
    this.lessonFormRef.onClose.pipe(map(lesson => {
      if (lesson) {
        const data: UpdateLessonInterface = {
          _id: this.lesson._id,
          title: lesson.title,
          content: lesson.content,
          video: lesson.video,
          new_chapter_id: lesson.chapter_id,
          old_chapter_id: this.chapter_id,
          course_id: this.course_id,
        }
        this._store.dispatch(UpdateLesson({ lesson: data }));
      }
    })).subscribe();
  }

  handleDelete(): void {
    console.log('Delete');
  }

  handleEdit(): void {
    console.log('Edit');
  }

  deleteConfirm() {
    this.confirmationService.confirm({
      header: 'Bạn có chắc muốn xóa bài học?',
      accept: () => {
        this._store.dispatch(DeleteLesson({ chapter_id: this.chapter_id, lesson_id: this.lesson._id }))
      },
      reject: () => {
      }
    });
  }
}
