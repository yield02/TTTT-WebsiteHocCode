import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopicsComponent } from '../../components/topics/topics.component';
import { Observable } from 'rxjs';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { selectTopics } from '../../../../store/forum/topic/topic.selectors';
import { Topic } from '../../../../models/forum/Topic';

@Component({
    selector: 'forum-home-page',
    standalone: true,
    imports: [
        CommonModule,
        TopicsComponent,
    ],
    templateUrl: './forum-home-page.component.html',
    styleUrl: './forum-home-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumHomePageComponent {

    topics$: Observable<{ [key: string]: Topic[] }> = this.store.select(selectTopics);

    constructor(private store: Store<AppState>) {

    }

}
