import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Chapter } from '../../../../models/Chapter';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ChapterComponent } from './chapter/chapter.component';
import { Course } from '../../../../models/Course';
import { DialogService } from 'primeng/dynamicdialog';
import { ChapterFormComponent } from '../../chapter-form/chapter-form.component';
import { AppState } from '../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, switchMap, tap } from 'rxjs';
import { selectChaptersMangerFromCourseId } from '../../../../store/chapters/chapters.selectors';
import { CreateChapter, FetchingChapters } from '../../../../store/chapters/chapters.actions';
import { SortChapter } from '../../../../store/mycoursemanager/mycoursemanager.actions';

@Component({
    selector: 'study-chapter-list',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        MenuModule,

        ChapterComponent,
    ],
    templateUrl: `./chapter-list.component.html`,
    styleUrl: './chapter-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterListComponent implements OnInit, OnDestroy {

    @Input() course!: Course;

    fetchedChapters: boolean = false;


    moreAction: MenuItem[] = [{
        label: 'Cài đặt',
        items: [
            {
                label: 'Thêm chương',
                icon: 'pi pi-plus',
                command: () => {
                    this.createChapter();
                }
            }
        ]
    }];

    subscriptions: Subscription[] = [];

    constructor(private _dialogSerive: DialogService, private _store: Store<AppState>) {
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this._store.pipe(select(selectChaptersMangerFromCourseId(this.course._id!)), tap(chapters => {

                if (chapters.length <= 0 && !this.fetchedChapters) {
                    this._store.dispatch(FetchingChapters({ course_id: this.course._id! }));
                    this.fetchedChapters = true;
                }

            })).subscribe()
        );


    }


    createChapter() {
        this.subscriptions.push(this._dialogSerive.open(ChapterFormComponent, {
            header: 'Thêm chương',
        }).onClose.subscribe((chapterTitle: string) => {
            if (chapterTitle?.length > 0) {
                this._store.dispatch(CreateChapter({
                    createChapter: {
                        course_id: this.course!._id!,
                        title: chapterTitle,
                    }
                }))
            }
        }));
    }

    sortChapter() {
        this._store.dispatch(SortChapter({
            course_id: this.course._id!,
            chapters_id: this.course?.chapters || [],
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
}
