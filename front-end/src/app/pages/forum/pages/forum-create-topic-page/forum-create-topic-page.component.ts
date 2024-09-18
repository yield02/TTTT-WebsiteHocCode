import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PostFormComponent } from '../../components/post-form/post-form.component';

@Component({
    selector: 'app-forum-create-topic-page',
    standalone: true,
    imports: [
        CommonModule,
        PostFormComponent,
    ],
    templateUrl: './forum-create-topic-page.component.html',
    styleUrl: './forum-create-topic-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumCreateTopicPageComponent {




}
