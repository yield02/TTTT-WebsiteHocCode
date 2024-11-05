import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
registerLocaleData(vi);

import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatboxOutline } from '@ng-icons/ionicons';
import { select, Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { AppState } from '../../../../store/reducer';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
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
import { EditorComponent, EditorModule } from '@tinymce/tinymce-angular';
import { Editor } from 'tinymce';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'learning-lesson-content',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIconComponent,
    YouTubePlayer,
    EditorComponent,
    FormsModule,

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
export class LessonComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild('lesson_video') video!: YouTubePlayer;

  course_id!: String;
  lesson$!: Observable<Lesson | undefined>;
  user$: Observable<AuthUser | undefined> = this._store.select(state => state.user);
  content: string = '';
  isFetched: boolean = false;
  learningFetched = false;
  initEditor: EditorComponent['init'] = {
    menubar: false,
    statusbar: false,
    toolbar: false,
    editable_root: false,
    base_url: '/tinymce',
    suffix: '.min',
    resize: 'both',
    autoresize_on_init: true,
    plugins: [
      'image',
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'codesample',
      'autoresize'
    ],
  }


  subscriptions: Subscription[] = [];
  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private _changeDetector: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.course_id = this._activatedRoute.snapshot.paramMap.get("courseId")!;

    const lesson_id = this._activatedRoute.snapshot.paramMap.get("lesson_id")!;




    this.lesson$ = this._activatedRoute.queryParams.pipe(
      switchMap((params) => {
        return this._store.select(selectLessonFromId(params['lesson_id']!))
      }), tap(lesson => {
        if (lesson) {
          this.content = lesson.content?.toString() || '';
          this._changeDetector.detectChanges();
        }
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
    this.subscriptions.push(this._activatedRoute.queryParams.pipe(
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
      })).subscribe());





  }

  ngAfterViewInit(): void {
    this.subscriptions.push(this._store.pipe(select(checkUserEnroll(this._activatedRoute.snapshot.paramMap.get("courseId")!)), tap((isEnroll) => {
      if (isEnroll) {
        // console.log('đã enroll');
      }
      else {
        // console.log('chưa enroll');
      }
    })).subscribe());
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

  ngOnDestroy(): void {

    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
