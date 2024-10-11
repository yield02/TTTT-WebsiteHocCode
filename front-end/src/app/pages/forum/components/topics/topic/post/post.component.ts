import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionEyeOutline, ionHeartOutline, ionTimeOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { Post } from '../../../../../../models/forum/Post';

import { AppState } from '../../../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../../../../../models/User';
import { selectUserFromId } from '../../../../../../store/users/users.selector';
import vi from '@angular/common/locales/vi';
registerLocaleData(vi);

@Component({
    selector: 'forum-topic-post',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        AvatarModule,
        RouterLink,
        NgIconComponent
    ],
    providers: [provideIcons({
        ionTimeOutline,
        ionHeartOutline,
        ionEyeOutline
    })],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicPostComponent implements OnInit {
    @Input() post!: Post;


    user$!: Observable<User | undefined>;

    constructor(private _store: Store<AppState>) {

    }

    ngOnInit(): void {

        this.user$ = this._store.pipe(select(selectUserFromId(this.post.author_id!)));
    }

    formatDateAndTime(date: String): String {
        return formatDate(new Date(date.toString()), 'dd/MM/yyyy HH:mm', 'vi');
    }
}
