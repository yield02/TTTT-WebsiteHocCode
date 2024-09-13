import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionCafeOutline, ionCalendarNumberOutline } from '@ng-icons/ionicons';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { SpeedDialModule } from 'primeng/speeddial';

@Component({
    selector: 'forum-comment',
    standalone: true,
    imports: [
        CommonModule,
        AvatarModule,
        NgIconComponent,
        ButtonModule,
        SpeedDialModule,
    ],
    providers: [provideIcons({
        ionCalendarNumberOutline,
        ionCafeOutline
    })],
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {

    moreActions!: MenuItem[] | null;
    constructor() {

    }

    ngOnInit(): void {
        this.moreActions = [
            {
                icon: 'pi pi-pencil',
                command: () => {
                }
            },

            {
                icon: 'pi pi-trash',
                command: () => {
                }
            },

            {
                icon: 'pi pi-flag',
            }
        ]
    }
}
