import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroStarSolid } from '@ng-icons/heroicons/solid';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { EnrollItemComponent } from './enroll-item/enroll-item.component';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RatingListComponent } from './rating-list/rating-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
@Component({
  selector: 'mycourses-course-manager',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    NgIconComponent,
    ButtonModule,
    CheckboxModule,
    EnrollItemComponent,
    InputTextModule,
    PaginatorModule,
    RatingListComponent,
    CommentListComponent,
  ],
  providers: [provideIcons({ heroStarSolid })]
  ,
  templateUrl: './courseManager.component.html',
  styleUrl: './courseManager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseManagerComponent {
  paginatorEnroll!: { first: number, rows: 5, total: number };
  paginatorMember!: { first: number, rows: 5, total: number };
  constructor() {
    this.paginatorEnroll = { first: 0, rows: 5, total: 10 };
    this.paginatorMember = { first: 0, rows: 5, total: 10 };
  }
}
