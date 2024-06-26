import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommentComponent } from '../../../../../../components/comment/comment.component';
import { Paginator } from '../../../../../../models/Paginator';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'course-manager-comment-list',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    PaginatorModule
  ],
  templateUrl: './commment-list.component.html',
  styleUrl: './comment-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentListComponent {
  paginator: Paginator;

  constructor() {
    this.paginator = {
      pageIndex: 0,
      pageSize: 5,
      totalRecord: 10,
    }
  }
  onPageChange(event: any) {
    this.paginator.pageIndex = event.first;
    this.paginator.pageSize = event.rows;
  }
}
