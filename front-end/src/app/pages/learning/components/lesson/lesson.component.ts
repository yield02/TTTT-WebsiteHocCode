import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatboxOutline } from '@ng-icons/ionicons';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIconComponent,
  ],
  providers: [provideIcons({ ionChatboxOutline })],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent {
  isComment: boolean = false;


  toggleIsComment(): void {
    this.isComment = !this.isComment;
  }

  test(): String {
    console.log('đã render');
    return 'test';
  }

}
