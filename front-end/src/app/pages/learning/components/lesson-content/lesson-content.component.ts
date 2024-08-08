import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi);
import { AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatboxOutline } from '@ng-icons/ionicons';
import { select, Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { AppState } from '../../../../store/reducer';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { Lesson } from '../../../../models/Lesson';
import { selectLessonFromId } from '../../../../store/lessons/lessons.selectors';
import { FetchingLessons } from '../../../../store/lessons/lessons.actions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HoursFormatPipe } from '../../../../pipe/my-datetime-format.pipe';
import { User } from '../../../../models/User';
import { checkUserEnroll, selectCourseFromCourseId } from '../../../../store/courses/courses.selector';
import { ContentComponent } from './content/content.component';
@Component({
  selector: 'learning-lesson-content',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIconComponent,

    ContentComponent,
    HoursFormatPipe,
  ],
  providers: [provideIcons({ ionChatboxOutline })],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit, AfterViewInit {
  course_id!: String;
  lesson$!: Observable<Lesson | undefined>;
  user$: Observable<User | undefined> = this._store.select(state => state.user);
  isFetched: boolean = false;


  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.course_id = this._activatedRoute.snapshot.paramMap.get("courseId")!;

    this.lesson$ = this._activatedRoute.queryParams.pipe(
      switchMap((params) => {
        return this._store.pipe(select(selectLessonFromId(params['lesson_id']!), tap((lesson: Lesson) => {
          if (!lesson || !lesson.video && !lesson.content && !this.isFetched) {
            this._store.dispatch(FetchingLessons(params['chapter_id']));
            this.isFetched = true;
          }
        })));
      })
    );


  }

  ngAfterViewInit(): void {
    this._store.pipe(select(checkUserEnroll(this._activatedRoute.snapshot.paramMap.get("courseId")!)), tap((isEnroll) => {
      if (isEnroll) {
        console.log('đã enroll');
      }
      else {
        console.log('chưa enroll');
      }
    })).subscribe()
  }



  sanitizeUrl(url?: string): SafeResourceUrl | undefined {
    if (url) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    return undefined;
  }

  formatDateAndTime(date: String): String {
    return formatDate(new Date(date.toString()), 'dd/MM/yyyy ', 'vi');
  }

}
