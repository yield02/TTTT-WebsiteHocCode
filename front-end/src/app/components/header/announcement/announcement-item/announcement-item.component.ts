import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Announcement } from '../../../../models/User';
import { fromNowTimeFormat } from '../../../../pipe/fromNowTimeFormat';
import { RouterLink } from '@angular/router';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { deleteAnnouncements, stateChangeAnnouncement } from '../../../../store/user/user.actions';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
    selector: 'app-announcement-item',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        ButtonModule,
        MenuModule,

        fromNowTimeFormat,
    ],
    templateUrl: './announcement-item.component.html',
    styleUrl: './announcement-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementItemComponent {
    @Input() announcement!: Announcement;



    constructor(private _store: Store<AppState>) {

    }

    toggleAnnouncements(): void {
        const state = this.announcement.state === 'read' ? 'unread' : 'read';
        this._store.dispatch(stateChangeAnnouncement({ announcement_ids: [this.announcement._id], state: state }));
    }

    deleteAnnouncement(): void {
        this._store.dispatch(deleteAnnouncements({ announcement_ids: [this.announcement._id] }));
    }
}
