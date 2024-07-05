import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CourseFormComponent } from '../../../../components/course-form/course-form.component';

@Component({
    selector: 'mycourses-create-course',
    standalone: true,
    imports: [
        CommonModule,
        CourseFormComponent
    ],
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCourseComponent { }
