import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { Course } from '../../../models/Course';

@Component({
    selector: 'study-details-course-manager',
    standalone: true,
    imports: [
        CommonModule,
        ChapterListComponent,
    ],
    templateUrl: './details-course-manager.component.html',
    styleUrl: './details-course-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCourseManagerComponent {

    @Input() course!: Course;

    activeSwitch: string = 'general';

    switchContent = [
        { title: 'Tổng quan', value: 'general' },
        { title: 'Danh sách bài học', value: 'lessons' },
    ];

    constructor() {

    }

    switchTab(value: string) {
        this.activeSwitch = value;
    }

}
