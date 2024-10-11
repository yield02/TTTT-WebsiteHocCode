import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CourseSearch } from '../../models/Course';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchComponent } from '../../components/Search/Search.component';
import { CourseComponent } from './course/course.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { SearchCourseItemComponent } from './components/search-course-item/search-course-item.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,



    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    CourseComponent,
    FooterComponent,
    SearchCourseItemComponent,
  ],
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LayOutComponent {
  sidebarVisible: boolean = false;


  courseSearch$: BehaviorSubject<CourseSearch[]> = new BehaviorSubject<CourseSearch[]>([]);


  constructor(private _courseService: CourseService) {

  }

  sidebarToggle(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  searchCourse(course_name: string) {
    this._courseService.searchCourseWithCourseName(course_name).subscribe(result => {
      this.courseSearch$.next(result);
    })
  }



}
