import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input, OnInit } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { Lesson } from '../../../../models/Lesson';
@Component({
    selector: 'home-course-lesson',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent
    ],
    providers: [provideIcons({
        bootstrapPersonVideo, ionDocumentTextOutline
    })],
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit {
    @Input() type: 'video' | 'text' = 'text';
    @Input() lesson!: Lesson;

    ducration: String = '00:00';

    constructor() {

    }

    ngOnInit(): void {
        if (this.lesson) {
            if (this.lesson.video) {
                this.type = 'video';
            }
        }
    }
}
