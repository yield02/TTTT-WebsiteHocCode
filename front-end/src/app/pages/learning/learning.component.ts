import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LearningHeaderComponent } from './components/learning-header/learning-header.component';
import { LessonComponent } from './components/lesson-content/lesson-content.component';
import { SidebarModule } from 'primeng/sidebar';
import { ChapterlistComponent } from './components/chapterlist/chapterlist.component';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/Course';
import { Observable, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { selectCourseFromCourseId } from '../../store/courses/courses.selector';
import { FetchingCourseFromCourseId } from '../../store/courses/courses.actions';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [
    CommonModule,
    LearningHeaderComponent,
    LessonComponent,
    ChapterlistComponent,
    SidebarModule,
  ],

  templateUrl: './learning.component.html',
  styleUrl: './learning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningComponent implements OnInit, DoCheck {

  @ViewChild('content') content!: ElementRef<HTMLDivElement>;
  @ViewChild('lessonBar') lessonBar!: ElementRef<HTMLDivElement>;
  @ViewChild('chapterlist') chapterlist!: ElementRef<CommonModule>;

  sidebarVisible: boolean = false;
  course$!: Observable<Course | undefined>;
  isFetched: boolean = false;



  constructor(private _activatedRoute: ActivatedRoute, private _store: Store<AppState>) {

  }

  ngDoCheck(): void {
    console.log('render');
  }

  checkrender() {
    console.log('render');
    return 'render check'
  }

  ngOnInit(): void {
    const course_id = this._activatedRoute.snapshot.paramMap.get('courseId');

    this.course$ = this._store.pipe(select(selectCourseFromCourseId(course_id!)), tap((course) => {
      if (!course && !this.isFetched) {
        this._store.dispatch(FetchingCourseFromCourseId({ course_id: course_id! }));
        this.isFetched = true;
      }
    }))
  }

  toggleLessonBar() {
    this.lessonBar.nativeElement.hidden = !this.lessonBar.nativeElement.hidden;
    if (this.lessonBar.nativeElement.hidden) {
      this.content.nativeElement.classList.remove('lg:col-span-3');
      this.content.nativeElement.classList.add('col-span-4');
    }
    else {
      this.content.nativeElement.classList.remove('col-span-4');
      this.content.nativeElement.classList.add('lg:col-span-3');
    }
  }
  toggleLessonSideBar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
