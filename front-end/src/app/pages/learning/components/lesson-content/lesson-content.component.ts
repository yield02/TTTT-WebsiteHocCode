import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
registerLocaleData(vi);

import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatboxOutline } from '@ng-icons/ionicons';
import { select, Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { AppState } from '../../../../store/reducer';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { Lesson } from '../../../../models/Lesson';
import { selectLessonFromId } from '../../../../store/lessons/lessons.selectors';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HoursFormatPipe } from '../../../../pipe/my-datetime-format.pipe';
import { AuthUser } from '../../../../models/User';
import { checkUserEnroll, } from '../../../../store/courses/courses.selector';
import { ContentComponent } from './content/content.component';
import { YOUTUBE_PLAYER_CONFIG, YouTubePlayer } from '@angular/youtube-player';
import { updateAndCreateLearning } from '../../../../store/learning/learning.actions';
import { selectLearningFromCourseId } from '../../../../store/learning/learning.selectors';

@Component({
  selector: 'learning-lesson-content',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIconComponent,
    YouTubePlayer,

    ContentComponent,
    HoursFormatPipe,
  ],
  providers: [provideIcons({ ionChatboxOutline }), {
    provide: YOUTUBE_PLAYER_CONFIG,
    useValue: {
      loadApi: true
    }
  }],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('lesson_video') video!: YouTubePlayer;

  course_id!: String;
  lesson$!: Observable<Lesson | undefined>;
  user$: Observable<AuthUser | undefined> = this._store.select(state => state.user);
  isFetched: boolean = false;
  learningFetched = false;

  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.course_id = this._activatedRoute.snapshot.paramMap.get("courseId")!;

    const lesson_id = this._activatedRoute.snapshot.paramMap.get("lesson_id")!;

    this.lesson$ = this._activatedRoute.queryParams.pipe(
      switchMap((params) => {
        return this._store.select(selectLessonFromId(params['lesson_id']!))
      }));
    //     .pipe(tap(lesson => {
    //       console.log(lesson, lesson?.video, lesson?.content, params['chapter_id']);
    //       if (!lesson || !lesson.video && !lesson.content && !this.isFetched) {
    //         // this._store.dispatch(FetchingLessons({ chapter_id: params['chapter_id'] }));
    //         this.isFetched = true;
    //       }
    //     }));
    //   })
    // );
    this._activatedRoute.queryParams.pipe(
      switchMap((params) => {
        this.learningFetched = false;
        return this._store.select(selectLearningFromCourseId(this.course_id)).pipe(tap(learning => {

          if (this.learningFetched) {
            return;
          }
          if (!params['chapter_id'] || !params['lesson_id']) {
            return;
          }

          this.learningFetched = true;
          this._store.dispatch(updateAndCreateLearning({ course_id: this.course_id, chapter_id: params['chapter_id'], lesson_id: params['lesson_id']!, learning_id: learning?._id }));
        }));
      })).subscribe();





  }

  ngAfterViewInit(): void {
    this._store.pipe(select(checkUserEnroll(this._activatedRoute.snapshot.paramMap.get("courseId")!)), tap((isEnroll) => {
      if (isEnroll) {
        // console.log('đã enroll');
      }
      else {
        // console.log('chưa enroll');
      }
    })).subscribe();
  }

  ngAfterViewChecked(): void {
    // this.video.stateChange.subscribe((event: YT.OnStateChangeEvent) => {
    //   console.log(event);
    //   if (event.data === YT.PlayerState.PLAYING) {
    //     console.log('Video is playing');
    //   }
    // });




  }



  checkRender() {
    console.log('render');
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
