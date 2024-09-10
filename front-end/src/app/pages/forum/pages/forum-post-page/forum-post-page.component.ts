import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'forum-post-page',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './forum-post-page.component.html',
    styleUrl: './forum-post-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostPageComponent { }
