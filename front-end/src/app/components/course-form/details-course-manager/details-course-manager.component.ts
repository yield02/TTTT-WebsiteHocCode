import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { Course } from '../../../models/Course';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { selectCourseFromCourseId } from '../../../store/courses/courses.selector';
import { Subscription } from 'rxjs';
import { selectCourseManagerFromId } from '../../../store/mycoursemanager/mycoursemanager.selectors';
import { toggleUpdatePublishCourse } from '../../../store/mycoursemanager/mycoursemanager.actions';

@Component({
    selector: 'study-details-course-manager',
    standalone: true,
    imports: [
        CommonModule,
        ChapterListComponent,
        MenuModule,
        ButtonModule,
    ],
    templateUrl: './details-course-manager.component.html',
    styleUrl: './details-course-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsCourseManagerComponent implements OnInit, OnDestroy {

    @Input() course!: Course;

    activeSwitch: string = 'general';

    moreActions: MenuItem[] | undefined;

    switchContent = [
        { title: 'Tổng quan', value: 'general' },
    ];

    courseSubscription!: Subscription;

    constructor(private _activatedRoute: ActivatedRoute, private _store: Store<AppState>) {
        this.moreActions = [{
            label: 'Cài đặt',
            items: [
                {
                    label: 'Xuất bản',
                    icon: 'pi pi-users',
                    command: () => {
                    }
                },
            ]
        }];
    }

    ngOnInit(): void {

        const course_id = this._activatedRoute.snapshot.params['courseid'];

        this.courseSubscription = this._store.select(
            selectCourseManagerFromId(this._activatedRoute.snapshot.params['courseid']))
            .subscribe(course => {
                if (course?.manager?.publish) {
                    this.moreActions = [{
                        label: 'Cài đặt',
                        items: [
                            {
                                label: 'Ẩn',
                                icon: 'pi pi-eye-slash',
                                command: () => {
                                    this._store.dispatch(toggleUpdatePublishCourse({ course_id: course_id, state: 'hidden' }))
                                }
                            },
                        ]
                    }]
                }
                else {
                    this.moreActions = [{
                        label: 'Cài đặt',
                        items: [
                            {
                                label: 'Công khai',
                                icon: 'pi pi-users',
                                command: () => {
                                    this._store.dispatch(toggleUpdatePublishCourse({ course_id: course_id, state: 'publish' }))
                                }
                            },
                        ]
                    }]
                }
            });
    }

    switchTab(value: string) {
        this.activeSwitch = value;
    }

    ngOnDestroy(): void {
        this.courseSubscription.unsubscribe();
    }

}
