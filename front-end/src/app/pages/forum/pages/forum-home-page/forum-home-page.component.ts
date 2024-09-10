import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopicsComponent } from '../../components/topics/topics.component';

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

}
