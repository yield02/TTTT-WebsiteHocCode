import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCafeOutline, ionCalendarNumberOutline, ionHeartOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommentEditorComponent } from '../../components/comment-editor/comment-editor.component';
import { CommentListComponent } from '../../components/comment-list/comment-list.component';

@Component({
    selector: 'forum-post-page',
    standalone: true,
    imports: [
        CommonModule,
        AvatarModule,
        NgIconComponent,
        ButtonModule,
        RouterLink,


        CommentEditorComponent,
        CommentListComponent,
    ],
    providers: [provideIcons({
        ionCalendarNumberOutline,
        ionCafeOutline,
        ionHeartOutline
    })],
    templateUrl: './forum-post-page.component.html',
    styleUrl: './forum-post-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumPostPageComponent { }
