import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMinus, heroPlus } from '@ng-icons/heroicons/outline';
import { LessonComponent } from '../lesson/lesson.component';
import { Chapter } from '../../../../models/Chapter';
import { Observable, tap } from 'rxjs';
import { Lesson } from '../../../../models/Lesson';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectLessonsFromChapterId } from '../../../../store/lessons/lessons.selectors';
import { FetchingLessons } from '../../../../store/lessons/lessons.actions';

@Component({
    selector: 'home-course-chapter',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,

        LessonComponent
    ],
    templateUrl: './chapter.component.html',
    styleUrl: './chapter.component.scss',
    providers: [provideIcons({ heroMinus, heroPlus })],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnInit, OnChanges {

    @Input() chapter!: Chapter;
    @Input() isCollapseAll?: boolean;
    isCollapsed: Boolean = true;
    isFetching: Boolean = false;

    lessons$!: Observable<Lesson[]>

    constructor(private _store: Store<AppState>) {

    }

    ngOnInit(): void {
        this.lessons$ = this._store.pipe(select(selectLessonsFromChapterId(this.chapter._id))).pipe(tap(lessons => {
            if (lessons.length <= 0 && !this.isFetching) {
                this._store.dispatch(FetchingLessons({ chapter_id: this.chapter._id }))
                this.isFetching = true;
            }
        }))
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['isCollapseAll']) {
            this.isCollapsed = this.isCollapseAll!;
        }
    }


    toggleCollapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }

}
