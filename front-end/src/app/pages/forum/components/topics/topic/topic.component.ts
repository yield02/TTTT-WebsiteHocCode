import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'forum-topic',
    standalone: true,
    imports: [
        CommonModule,
        AvatarModule,
        RouterLink
    ],
    templateUrl: './topic.component.html',
    styleUrl: './topic.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicComponent { }
