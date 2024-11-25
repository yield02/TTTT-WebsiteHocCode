import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LearningHeaderComponent } from './components/learning-header/learning-header.component';
import { LessonComponent } from './components/lesson-content/lesson-content.component';
import { SidebarModule } from 'primeng/sidebar';
import { ChapterlistComponent } from './components/chapterlist/chapterlist.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/Course';
import { combineLatest, forkJoin, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { selectCourseFromCourseId, selectFirstChapterAndLesson } from '../../store/courses/courses.selector';
import { FetchingCourseFromCourseId } from '../../store/courses/courses.actions';
import { selectLearningFromCourseId } from '../../store/learning/learning.selectors';
import { fetchLearning } from '../../store/learning/learning.actions';
import { LearningInterFace } from '../../models/Learning';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';

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
export class LearningComponent implements OnInit, OnDestroy {

  @ViewChild('content') content!: ElementRef<HTMLDivElement>;
  @ViewChild('lessonBar') lessonBar!: ElementRef<HTMLDivElement>;
  @ViewChild('chapterlist') chapterlist!: ElementRef<CommonModule>;

  sidebarVisible: boolean = false;
  course$!: Observable<Course | undefined>;
  isFetched: boolean = false;

  subcriptions: Subscription[] = [];



  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store<AppState>,
    private _router: Router,
    private _messageService: MessageService
  ) {

  }





  ngOnInit(): void {
    const course_id = this._activatedRoute.snapshot.paramMap.get('courseId');

    this.course$ = this._store.pipe(select(selectCourseFromCourseId(course_id!)), tap((course) => {
      if (!course && !this.isFetched) {
        this._store.dispatch(FetchingCourseFromCourseId({ course_id: course_id! }));
        this.isFetched = true;
      }
    }));

    this.subcriptions.push(
      this._store.pipe(select(selectLearningFromCourseId(course_id!)), tap(learning => {
        if (learning) {
          return;
        }
        return this._store.dispatch(fetchLearning({ course_id: course_id! }));
      })).subscribe());



    this.subcriptions.push(
      combineLatest({
        user: this._store.select('user'),
        course: this._store.pipe(select(selectCourseFromCourseId(course_id as String)))
      }).pipe(map(
        ({ user, course }) => {
          if (user._id && course?.enroll?.includes(user._id) || user?._id == course?.author_id._id) {
            return true;
          }
          if (user && course) {
            return false;
          }
          return;
        }
      )).subscribe(result => {
        if (result === false) {
          this._messageService.add(
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Bạn chưa ghi danh khóa học này',
              key: "global"
            }
          );
          this._router.navigate(['/home']);
        }
      }))

    this.subcriptions.push(
      this._store.pipe(
        select(selectLearningFromCourseId(this._activatedRoute.snapshot.params['courseId'])),
        switchMap((learning: LearningInterFace | undefined) => {
          if (learning) {
            this._router.navigate([`/learning/${this._activatedRoute.snapshot.params['courseId']}`], { queryParams: { chapter_id: learning.current_chapter, lesson_id: learning.current_lesson } });
            return of(undefined);
          }
          return this._store.pipe(select(selectFirstChapterAndLesson(this._activatedRoute.snapshot.params['courseId'])))

        }), tap(data => {
          if (!data) return;
          this._router.navigate([`/learning/${course_id}`], { queryParams: { chapter_id: data.chapter._id, lesson_id: data.lesson._id } });
        })
      ).subscribe()
    );
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

  ngOnDestroy(): void {
    this.subcriptions.forEach(sub => sub.unsubscribe());
  }
}
