import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TreeModule } from 'primeng/tree';
import { ChapterComponent } from '../chapter/chapter.component';
import { Observable, tap } from 'rxjs';
import { Chapter } from '../../../../models/Chapter';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { selectChapters, selectChaptersFromCourseId } from '../../../../store/chapters/chapters.selectors';
import { ActivatedRoute } from '@angular/router';
import { FetchingChapters } from '../../../../store/chapters/chapters.actions';


@Component({
  selector: 'app-chapterlist',
  standalone: true,
  imports: [
    CommonModule,
    TreeModule,
    ChapterComponent,
  ],
  templateUrl: './chapterlist.component.html',
  styleUrl: './chapterlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterlistComponent implements OnInit {
  chapters$!: Observable<Chapter[]>;
  isFetching: boolean = false;

  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const courseId = this._activatedRoute.snapshot.paramMap.get('courseId');
    this.chapters$ = this._store.pipe(select(selectChaptersFromCourseId(courseId!)), tap((chapters) => {
      if (chapters.length <= 0 && !this.isFetching) {
        this._store.dispatch(FetchingChapters({ course_id: courseId! }))
        this.isFetching = true;
      }
    }))
  }
}

