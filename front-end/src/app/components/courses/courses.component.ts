import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { CourseComponent } from '../course/course.component';
import { Subject } from '../../models/Subject';
import { Course } from '../../models/Course';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { selectCoursesFromSubjectId } from '../../store/courses/courses.selector';
import { Observable, tap } from 'rxjs';
import { FetchingCoursesFromSubject } from '../../store/courses/courses.actions';

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


export class CoursesComponent implements OnInit {
  @Input() subject!: Subject;
  courses$!: Observable<Course[]>;
  fetched: Boolean = false;

  page: PageEvent = {
    first: 0,
    rows: 8,
    page: 0,
    pageCount: 0,
    total: 20
  }

  constructor(private _store: Store<AppState>
  ) {

  }
  ngOnInit(): void {

    this.courses$ = this._store.pipe(select(selectCoursesFromSubjectId(this.subject._id))).pipe(tap(courses => {
      if (courses.length <= 0 && !this.fetched) {
        this._store.dispatch(FetchingCoursesFromSubject({ subject_id: this.subject._id }));
        this.fetched = true;
      }
    }));

  }

  onPageChange(event: any) {
    console.log(event);
    this.page.first = event.first;
    this.page.rows = event.rows;
  }
}
