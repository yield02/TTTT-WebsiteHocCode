import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootstrapHeart, bootstrapHeartbreak } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroAcademicCap } from '@ng-icons/heroicons/outline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    NgIconComponent,
    PaginatorModule,
    ButtonModule,
    ProgressBarModule,
    RouterLink
  ],
  providers: [provideIcons({ heroAcademicCap, bootstrapHeart, bootstrapHeartbreak })],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent {
  @Input() type: string = 'introduce';

}
