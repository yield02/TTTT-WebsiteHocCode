import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionTimeOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'topic-post',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        AvatarModule,
    ],
    providers: [provideIcons({
        ionTimeOutline
    })],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicPostComponent { }
