import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TopicPostComponent } from '../../components/topics/topic/post/post.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConfirmPopup, ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Filter } from '../../../../models/forum/Filter';
import { AppState } from '../../../../store/reducer';
import { Store } from '@ngrx/store';
import { Hashtag } from '../../../../models/forum/Hashtag';
import { BehaviorSubject, map, Observable, Subscription, switchMap } from 'rxjs';
import { MultiSelectModule } from 'primeng/multiselect';
import { Post } from '../../../../models/forum/Post';
import { PostService } from '../../../../services/forum/post.service';
import { FormsModule } from '@angular/forms';
import { ForumPostPageComponent } from "../forum-post-page/forum-post-page.component";
import { FetchUsers } from '../../../../store/users/users.actions';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronDownSolid } from '@ng-icons/heroicons/solid';
import { AuthUser } from '../../../../models/User';



interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
    totalRecord: number;
}

interface DropDownInterface {
    name: string;
    code: string;
}

@Component({
    selector: 'forum-topic-page',
    standalone: true,
    imports: [
        CommonModule,
        TopicPostComponent,
        PaginatorModule,
        ButtonModule,
        RouterLink,
        ConfirmPopupModule,
        InputTextModule,
        DropdownModule,
        MultiSelectModule,
        FormsModule,
        ForumPostPageComponent,
        NgIconComponent,
    ],
    providers: [ConfirmationService, provideIcons({ heroChevronDownSolid })],
    templateUrl: './forum-topic-page.component.html',
    styleUrl: './forum-topic-page.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumTopicPageComponent implements OnInit, OnDestroy {


    topic_id!: string;
    @ViewChild('filterPopup') filterPopup!: ConfirmPopup;


    filterPost: Filter = {
        page: 1,
        time: 'any'
    }




    page: PageEvent = {
        first: 0,
        rows: 10,
        page: 1,
        pageCount: 10,
        totalRecord: 0
    }

    authUser$: Observable<AuthUser> = this._store.select(state => state.user);
    hashtags$: Observable<Hashtag[]> = this._store.select(state => state.hashtag);
    posts$: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

    listenRoute!: Subscription | undefined;

    constructor(private _activatedRoute: ActivatedRoute, private _confirmationService: ConfirmationService, private _router: Router, private _store: Store<AppState>, private _postService: PostService) {
        this.topic_id = this._activatedRoute.snapshot.params['topicId'];
    }

    ngOnInit(): void {

        this.listenRoute = this._activatedRoute.queryParamMap.pipe(switchMap(() => this._postService.getPostsWithTopicId(this.topic_id, this.filterPost))).subscribe(
            (data) => {
                this.posts$.next(data.data);


                this._store.dispatch(FetchUsers({ users_id: data.data.map(post => post.author_id) as String[] }));

                this.page = {
                    ...this.page,
                    pageCount: Math.ceil(data.totalPosts / this.page.rows),
                    totalRecord: data.totalPosts
                };
            }
        );
    }

    accept() {
        this.filterPopup.accept();
    }

    reject() {
        this.filterPopup.reject();
    }


    filter(event: Event) {
        this._confirmationService.confirm({
            target: event.target as EventTarget,
            closeOnEscape: false,
            dismissableMask: false,
            acceptLabel: 'Lọc',
            rejectLabel: 'Hủy',
            accept: () => {
                console.log(this.filterPost);
                this._router.navigate(['/forum/topic/' + this.topic_id], { queryParams: { ...this.filterPost } });
            },
            reject: () => {
                this._router.navigate(['/forum/topic/' + this.topic_id]);
            }
        });
    }

    checkUserInfor(user: AuthUser): boolean {
        if (user.role === 'admin') {
            return true;
        }
        if (user.email?.verify == false || !user.address || !user.phone || !user.fullname || !user.address) {
            return false;
        }
        return true;
    }

    onPageChange(event: any) {
        this.page = { ...this.page, ...event };
        this.filterPost = { ...this.filterPost, page: ++event.page };
        console.log(this.filterPost);
        this._router.navigate(['/forum/topic/' + this.topic_id], { queryParams: { ...this.filterPost } });
    }

    ngOnDestroy(): void {
        this.listenRoute?.unsubscribe();
    }

}
