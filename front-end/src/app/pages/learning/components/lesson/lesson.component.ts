import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCheckCircleSolid } from '@ng-icons/heroicons/solid';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { Lesson } from '../../../../models/Lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
    selector: 'learning-lesson',
    standalone: true,
    imports: [
        CommonModule,

        NgIconComponent
    ],
    providers: [provideIcons({
        bootstrapPersonVideo,
        ionDocumentTextOutline,
        heroCheckCircleSolid
    })],
    templateUrl: './lesson.component.html',
    styleUrl: './lesson.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent implements OnInit, OnChanges {
    @Input() lesson!: Lesson;
    @Input() index!: number;
    @Input() chapter_index!: number;
    @Input() chapter_id!: String;


    active$!: Observable<boolean>;


    constructor(private _roter: Router, private _activatedRoute: ActivatedRoute) {

    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngOnInit(): void {
        if (this.index == 1 && this.chapter_index == 1) {
            this._roter.navigate([`/learning/${this.lesson.course_id}`], { queryParams: { chapter_id: this.chapter_id, lesson_id: this.lesson._id } });
        }
        this.active$ = this._activatedRoute.queryParams.pipe(
            map(params => {
                if (params['lesson_id'] === this.lesson._id) {
                    return true;
                }
                else {
                    return false;
                }
            })
        );
    }

    navigateToLesson() {
        this._roter.navigate([`/learning/${this.lesson.course_id}`], { queryParams: { chapter_id: this.chapter_id, lesson_id: this.lesson._id } });
    }
}
