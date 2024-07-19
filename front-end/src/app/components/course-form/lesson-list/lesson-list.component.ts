import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Lesson } from '../../../models/Lesson';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { LessonComponent } from '../lesson/lesson.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { FetchingLessons } from '../../../store/lessons/lessons.actions';
import { map, Observable, tap } from 'rxjs';
import { selectLessonsFromChapterId } from '../../../store/lessons/lessons.selectors';

@Component({
    selector: 'app-lesson-list',
    standalone: true,
    imports: [
        CommonModule,
        OrderListModule,
        ButtonModule,

        LessonComponent,
    ],
    templateUrl: './lesson-list.component.html',
    styleUrl: './lesson-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonListComponent implements OnInit, OnChanges {

    @Input() collapsed: boolean = true;
    @Input() chapter_id!: String;
    @Input() course_id!: String;
    lessons$!: Observable<Lesson[]>;
    fetched: boolean = false;


    constructor(private _store: Store<AppState>) {

    }

    ngOnChanges(changes: SimpleChanges): void {

        if (!changes['collapsed'].currentValue && !this.fetched) {
            this._store.dispatch(FetchingLessons({ chapter_id: this.chapter_id }));
            this.fetched = true;
        }


    }

    ngOnInit(): void {
        this.lessons$ = this._store.pipe(select(selectLessonsFromChapterId(this.chapter_id)), tap(lesson => {
            if (lesson.length > 0 && !this.fetched) {
                this.fetched = true;
            }
        }));
    }
}
