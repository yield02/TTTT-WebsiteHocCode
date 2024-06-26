import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RatingItemComponent } from '../rating-item/rating-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { Paginator } from '../../../../../../models/Paginator';

@Component({
  selector: 'course-manager-rating-list',
  standalone: true,
  imports: [
    CommonModule,
    RatingItemComponent,
    PaginatorModule
  ],
  templateUrl: './rating-list.component.html',
  styleUrl: './rating-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingListComponent implements OnInit {

  paginator: Paginator;

  constructor() {
    this.paginator = {
      pageIndex: 0,
      pageSize: 5,
      totalRecord: 10,
    }
  }

  ngOnInit(): void {
    console.log('RatingListComponent');
  }

  onPageChange(event: any) {
    this.paginator.pageIndex = event.first;
    this.paginator.pageSize = event.rows;
  }
}
