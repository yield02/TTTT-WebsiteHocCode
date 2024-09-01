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
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RatingComponent } from '../raiting/rating.component';


@Component({
  selector: 'app-chapterlist',
  standalone: true,
  imports: [
    CommonModule,
    TreeModule,
    ChapterComponent,
  ],
  providers: [DialogService],
  templateUrl: './chapterlist.component.html',
  styleUrl: './chapterlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterlistComponent implements OnInit {
  chapters$!: Observable<Chapter[]>;
  isFetching: boolean = false;


  ratingDynamicComponent: DynamicDialogRef | undefined;

  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, public dialogService: DialogService) { }

  ngOnInit(): void {
    const courseId = this._activatedRoute.snapshot.paramMap.get('courseId');
    this.chapters$ = this._store.pipe(select(selectChaptersFromCourseId(courseId!)), tap((chapters) => {
      if (chapters.length <= 0 && !this.isFetching) {
        this._store.dispatch(FetchingChapters({ course_id: courseId! }))
        this.isFetching = true;
      }
    }));
  }

  onRaiting() {
    this.ratingDynamicComponent = this.dialogService.open(RatingComponent, {
      header: 'Đánh giá khóa học', data: {
        course_id: this._activatedRoute.snapshot.paramMap.get('courseId')!

      }
    });
    this.ratingDynamicComponent.onClose.pipe(tap(data => {
      console.log(data);
    })).subscribe()
  }
}

