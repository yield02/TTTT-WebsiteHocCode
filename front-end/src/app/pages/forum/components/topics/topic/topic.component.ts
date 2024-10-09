import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { Topic } from '../../../../../models/forum/Topic';
import { MultiSelectModule } from 'primeng/multiselect';




@Component({
    selector: 'forum-topic',
    standalone: true,
    imports: [
        CommonModule,
        AvatarModule,
        RouterLink,
        MultiSelectModule,
        RouterLink
    ],
    templateUrl: './topic.component.html',
    styleUrl: './topic.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicComponent {
    @Input() topic!: Topic;


}
