import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BoardItemComponent } from './board-item/board-item.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { Course } from '../../../../models/Course';
import { Store } from '@ngrx/store';
import { map, of, switchMap, tap } from 'rxjs';
import { CourseManagerService } from '../../../../services/course-manger.service';
import { Add } from '../../../../store/mycoursemanager/mycoursemanager.actions';
import { Observable } from 'rxjs';

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
export class MycoursesComponent implements OnInit {
  courses!: Observable<Course[]> | undefined;
  searchValue: String = '';


  constructor(private courseManagerStore: Store<{ myCourseManager: Course[] }>, private courseManagerService: CourseManagerService) {

    // fetch data when component is initialized
    this.courseManagerStore.select('myCourseManager').pipe(switchMap((data: Course[]) => {
      if (data.length <= 0) {
        return this.courseManagerService.getCourses();
      }
      return of({ courses: [] });
    })).subscribe((data) => {
      if (data.courses.length > 0) {
        courseManagerStore.dispatch(Add({ courses: data.courses }));
      }
    })
  }


  ngOnInit(): void {
    this.courses = this.courseManagerStore.select('myCourseManager');
  }



}
