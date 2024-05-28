import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CourseComponent } from './course/course.component';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
  total: number;
}


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, PaginatorModule, CourseComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class CoursesComponent {
  page: PageEvent = {
    first: 0,
    rows: 8,
    page: 0,
    pageCount: 0,
    total: 20
  }


  onPageChange(event: any) {
    console.log(event);
    this.page.first = event.first;
    this.page.rows = event.rows;
  }
}
