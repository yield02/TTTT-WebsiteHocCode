import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionMenuOutline } from '@ng-icons/ionicons';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-learning-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent,
    ButtonModule
  ],
  providers: [provideIcons({ ionMenuOutline })],
  templateUrl: './learning-header.component.html',
  styleUrl: './learning-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningHeaderComponent {
  @Input() toggleLessonBar!: Function;
  @Input() toggleLessonSideBar!: Function;
}
