import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopicPostComponent } from '../../components/topics/topic/post/post.component';
import { PaginatorModule } from 'primeng/paginator';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
    selector: 'forum-topic-page',
    standalone: true,
    imports: [
        CommonModule,
        TopicPostComponent,
        PaginatorModule
    ],
    templateUrl: './forum-topic-page.component.html',
    styleUrl: './forum-topic-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumTopicPageComponent {

    page: PageEvent = {
        first: 0,
        rows: 10,
        page: 1,
        pageCount: 10
    }



}
