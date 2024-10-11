import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CourseSearch } from '../../../../models/Course';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionTimeOutline } from '@ng-icons/ionicons';
import vi from '@angular/common/locales/vi';
import { RouterLink } from '@angular/router';

registerLocaleData(vi);

@Component({
    selector: 'study-search-course-item',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        RouterLink,
    ],
    providers: [provideIcons({
        ionTimeOutline
    })],
    templateUrl: `./search-course-item.component.html`,
    styleUrl: './search-course-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchCourseItemComponent {
    @Input() course!: CourseSearch;



    formatTime(date: string) {


        return formatDate(new Date(date.toString()), 'dd/MM/yyyy', 'vi');

    }
}
