import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionTimeOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { Post } from '../../../../../../models/forum/Post';

import vi from '@angular/common/locales/vi';
registerLocaleData(vi);

@Component({
    selector: 'forum-topic-post',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        AvatarModule,
        RouterLink
    ],
    providers: [provideIcons({
        ionTimeOutline
    })],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicPostComponent implements OnInit {
    @Input() post!: Post;

    constructor() {
    }

    ngOnInit(): void {
    }

    formatDateAndTime(date: String): String {
        return formatDate(new Date(date.toString()), 'dd/MM/yyyy HH:mm', 'vi');
    }
}
