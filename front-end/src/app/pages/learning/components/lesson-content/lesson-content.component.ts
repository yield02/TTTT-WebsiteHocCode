import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';

registerLocaleData(vi);
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'learning-lesson-content',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIconComponent,

    HoursFormatPipe,
  ],
  providers: [provideIcons({ ionChatboxOutline })],
  templateUrl: './lesson-content.component.html',
  styleUrl: './lesson-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit {
  isComment: boolean = false;
  course_id!: String;
  lesson$!: Observable<Lesson | undefined>;
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

  toggleIsComment(): void {
    this.isComment = !this.isComment;
  }

  test(): String {
    console.log('đã render');
    return 'test';
  }
  sanitizeUrl(url: string): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  formatDateAndTime(date: String): String {
    return formatDate(new Date(date.toString()), 'dd/MM/yyyy ', 'vi');
  }

}
