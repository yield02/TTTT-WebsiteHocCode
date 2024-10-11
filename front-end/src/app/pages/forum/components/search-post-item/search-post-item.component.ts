import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Post, PostSearch } from '../../../../models/forum/Post';

import vi from '@angular/common/locales/vi';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionTimeOutline } from '@ng-icons/ionicons';
import { RouterLink } from '@angular/router';
registerLocaleData(vi);

@Component({
    selector: 'forum-search-post-item',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        RouterLink
    ],
    providers: [provideIcons({ ionTimeOutline })],
    templateUrl: './search-post-item.component.html',
    styleUrl: './search-post-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPostItemComponent {
    @Input() post!: PostSearch;

    formatTime(time: string): string {
        return formatDate(new Date(time), 'dd/MM/yyyy HH:mm', 'vi');
    }
}
