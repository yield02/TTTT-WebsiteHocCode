import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionEyeOutline, ionHeartOutline, ionTimeOutline } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { Post } from '../../../../../../models/forum/Post';

import { AppState } from '../../../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../../../../../models/User';
import { selectUserFromId } from '../../../../../../store/users/users.selector';
import vi from '@angular/common/locales/vi';
import { selectHashtagWithIds } from '../../../../../../store/forum/hashtag/hashtag.selectors';
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
export class TopicPostComponent implements OnInit, OnDestroy {
    @Input() post!: Post;


    user$!: Observable<User | undefined>;

    hashtag: string = '';

    hashtagSubscription!: Subscription;

    constructor(private _store: Store<AppState>) {

    }

    ngOnInit(): void {

        this.user$ = this._store.pipe(select(selectUserFromId(this.post.author_id!)));

        this.hashtagSubscription = this._store.pipe(select(selectHashtagWithIds(
            this.post.hashtags
        ))).subscribe(hashtag => {
            this.hashtag = hashtag;
        });

    }

    formatDateAndTime(date: String): String {
        return formatDate(new Date(date.toString()), 'dd/MM/yyyy HH:mm', 'vi');
    }

    ngOnDestroy(): void {
        this.hashtagSubscription.unsubscribe();
    }
}
