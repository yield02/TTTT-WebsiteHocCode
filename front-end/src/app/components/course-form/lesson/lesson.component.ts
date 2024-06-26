import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { ButtonModule } from 'primeng/button';
import { Lesson } from '../../../models/Lesson';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'course-form-lesson',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [provideIcons({ bootstrapPersonVideo, ionDocumentTextOutline }), ConfirmationService],
  templateUrl: `./lesson.component.html`,
  styleUrl: './lesson.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent {
  @Input() data!: Lesson;

  constructor(private confirmationService: ConfirmationService) { }

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
      },
      reject: () => {
      }
    });
  }
}
