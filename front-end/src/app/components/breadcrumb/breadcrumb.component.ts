import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroClipboardDocumentList } from '@ng-icons/heroicons/outline';
import { ionDocumentTextOutline, ionHomeOutline } from '@ng-icons/ionicons';
import { select, Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BehaviorSubject, filter, map, of, switchMap, take, tap } from 'rxjs';
import { AppState } from '../../store/reducer';
import { selectTopic } from '../../store/forum/topic/topic.selectors';
import { selectPostWithPostId } from '../../store/forum/post/post.selectors';
import { Topic } from '../../models/forum/Topic';

@Component({
    selector: 'forum-breadcrumb',
    standalone: true,
    imports: [
        CommonModule,
        BreadcrumbModule,
        NgIconComponent,
    ],
    providers: [provideIcons({
        ionHomeOutline,
        heroClipboardDocumentList,
        ionDocumentTextOutline
    })],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit, AfterViewChecked {
    itemsBreadcrumb: MenuItem[] = [];

    itemsBreadcrumb$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([{
        icon: 'ionHomeOutline',
        route: '/forum'
    }]);


    constructor(private _activatedRouter: ActivatedRoute, private _router: Router, private ref: ChangeDetectorRef, private _store: Store<AppState>) {
        this._router.events.pipe(
            map(
                val => {

                    if (val instanceof Scroll) {
                        const url = val.routerEvent.url.split('/');
                        return url;
                    }

                    if (val instanceof NavigationEnd) {
                        const url = val.url.split('/');
                        return url;
                    }
                    return [];
                }),
            switchMap(val => {
                if (val.length > 0 && val[1] === 'forum') {
                    this.itemsBreadcrumb = [
                        {
                            icon: 'ionHomeOutline',
                            route: '/forum'
                        }
                    ];
                    this.ref.detectChanges();

                }


                if (val.length > 0 && val[2] == 'topic') {
                    return this._store.pipe(select(selectTopic(val[3])));
                }

                if (val.length > 0 && val[2] === 'post') {
                    return this._store.pipe(select(selectPostWithPostId(Number(val[3]))));
                }

                return of({});
            }),
            switchMap(val => {
                if (val && 'post_id' in val) {
                    this.itemsBreadcrumb[2] = {
                        label: `${val.title}`,
                        icon: 'ionDocumentTextOutline',
                        route: '/forum/post/' + val.post_id
                    }

                    return this._store.pipe(select(selectTopic(val.topic!)));
                }

                if (val && 'title' in val) {
                    this.itemsBreadcrumb[1] = {
                        label: `${val.title}`,
                        icon: 'heroClipboardDocumentList',
                        route: '/forum/topic/' + val._id
                    };

                    return of({});
                }

                return of({});
            }),
            tap(val => {
                if (val && 'title' in val) {
                    this.itemsBreadcrumb[1] = {
                        label: `${val.title}`,
                        icon: 'heroClipboardDocumentList',
                        route: '/forum/topic/' + val._id
                    }

                }
            })
        ).subscribe((val) => {
            if (this.itemsBreadcrumb.length >= 1) {
                this.itemsBreadcrumb$.next(this.itemsBreadcrumb);
            }
        });

    }
    ngOnInit(): void {
    }

    ngAfterViewChecked(): void {

    }



}
