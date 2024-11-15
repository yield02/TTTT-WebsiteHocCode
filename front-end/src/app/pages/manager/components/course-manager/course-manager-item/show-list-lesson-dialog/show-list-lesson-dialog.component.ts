import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppState } from '../../../../../../store/reducer';
import { Lesson } from '../../../../../../models/Lesson';
import { Subscription } from 'rxjs';
import { selectAdminLessonCourseState, selectAdminLessonWithCourseId } from '../../../../../../store/admin/course/course.selectors';
import { ShowLessonContentComponent } from '../../../../../../components/course-form/show-lesson-content/show-lesson-content.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocument } from '@ng-icons/ionicons';
import { heroComputerDesktopSolid } from '@ng-icons/heroicons/solid';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'app-show-list-lesson-dialog',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        TooltipModule

    ],
    providers: [DialogService, provideIcons({
        ionDocument,
        heroComputerDesktopSolid
    })],
    templateUrl: './show-list-lesson-dialog.component.html',
    styleUrl: './show-list-lesson-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowListLessonDialogComponent implements OnInit, OnDestroy {

    @Input() lessons!: Lesson[];


    lessonRef: DynamicDialogRef | undefined;

    subscription: Subscription[] = [];

    constructor(private _store: Store<AppState>, private _dynamicDialogConfig: DynamicDialogConfig, private _dialogService: DialogService) {
    }


    ngOnInit(): void {
        const course_id = this._dynamicDialogConfig.data.course_id;

        this.subscription.push(
            this._store.pipe(select(selectAdminLessonWithCourseId(course_id))).subscribe(lesson => {
                this.lessons = lesson
            })
        )
    }

    showContent(index: number) {
        this.lessonRef = this._dialogService.open(ShowLessonContentComponent, {
            header: "Nội dung bài học",
            width: '60%',
            height: '90%',
            data: { lesson: this.lessons[index] },
            contentStyle: { 'overflow-y': 'auto' },
            modal: true,
        });
    }


    ngOnDestroy(): void {
        this.subscription.forEach(sub => sub.unsubscribe());
    }
}
