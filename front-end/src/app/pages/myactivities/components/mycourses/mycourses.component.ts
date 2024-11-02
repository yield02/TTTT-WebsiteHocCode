import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BoardItemComponent } from './board-item/board-item.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule, NgForm } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Course } from '../../../../models/Course';
import { Store } from '@ngrx/store';
import { BehaviorSubject, debounceTime, map, of, switchMap, tap } from 'rxjs';
import { CourseManagerService } from '../../../../services/course-manger.service';
import { Add } from '../../../../store/mycoursemanager/mycoursemanager.actions';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducer';
import { state } from '@angular/animations';
import { selectCourseManagerWithName } from '../../../../store/mycoursemanager/mycoursemanager.selectors';

@Component({
  selector: 'myacc-mycourses',
  standalone: true,
  imports: [
    CommonModule,
    BoardItemComponent,
    CourseItemComponent,
    DataViewModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: `./mycourses.component.html`,
  styleUrl: './mycourses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MycoursesComponent implements OnInit, AfterViewInit {
  @ViewChild('form') searchForm!: NgForm;
  courses: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  searchValue: String = '';
  isFetching: boolean = false;


  constructor(private store: Store<AppState>, private courseManagerService: CourseManagerService) {

    // fetch data when component is initialized
    this.store.select('myCourseManager').pipe(switchMap((data: Course[]) => {
      if (!this.isFetching) {
        this.isFetching = true;
        return this.courseManagerService.getCourses();
      }
      return of({ courses: [] });
    })).subscribe((data) => {
      if (data.courses.length > 0) {
        store.dispatch(Add({ courses: data.courses }));
      }
    })
  }


  ngOnInit(): void {
    this.store.select(state => state.myCourseManager).pipe(tap(courses => {
      this.courses.next(courses);
    })).subscribe();

  }
  ngAfterViewInit(): void {
    this.searchForm.valueChanges?.pipe(
      debounceTime(500),
      switchMap(form => {
        if (form?.search) {
          return this.store.select(selectCourseManagerWithName(form.search));
        }
        return this.store.select(state => state.myCourseManager);
      }),
      tap(course => {
        this.courses.next(course);
      })
    ).subscribe();
  }



}
