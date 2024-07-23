import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroChevronRight } from '@ng-icons/heroicons/outline';
import { LessonComponent } from '../lesson/lesson.component';
import { Chapter } from '../../../../models/Chapter';
import { Lesson } from '../../../../models/Lesson';
import { Observable, tap } from 'rxjs';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectLessonsFromChapterId } from '../../../../store/lessons/lessons.selectors';
import { FetchingLessons } from '../../../../store/lessons/lessons.actions';

@Component({
    selector: 'learning-chapter',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,

        LessonComponent
    ],
    providers: [provideIcons({ heroChevronRight, heroChevronDown })],
    templateUrl: './chapter.component.html',
    styleUrl: './chapter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterComponent implements OnInit {
    @Input() chapter!: Chapter;
    @Input() index!: number;


    isCollapsed: boolean = true;
    isFetched: boolean = false;
    lessons$!: Observable<Lesson[]>

    constructor(private _store: Store<AppState>) {

    }

    ngOnInit(): void {
        if (this.index == 1) {
            this.isCollapsed = false;
        }
        this.lessons$ = this._store.pipe(select(selectLessonsFromChapterId(this.chapter._id)), tap(lessons => {
            if (lessons.length <= 0 && !this.isFetched && !this.isCollapsed) {
                this._store.dispatch(FetchingLessons({ chapter_id: this.chapter._id }))
                this.isFetched = true;
            }
        }))
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}
