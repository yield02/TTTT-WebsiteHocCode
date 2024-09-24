import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopicPostComponent } from '../../components/topics/topic/post/post.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
        PaginatorModule,
        ButtonModule,
        RouterLink
    ],
    templateUrl: './forum-topic-page.component.html',
    styleUrl: './forum-topic-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumTopicPageComponent {


    topic_id!: string;


    page: PageEvent = {
        first: 0,
        rows: 10,
        page: 1,
        pageCount: 10
    }

    constructor(private _activatedRoute: ActivatedRoute) {
        this.topic_id = this._activatedRoute.snapshot.params['topicId'];
    }


}
