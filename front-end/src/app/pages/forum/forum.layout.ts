import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchComponent } from '../../components/Search/Search.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline, ionHomeOutline } from '@ng-icons/ionicons';
import { heroClipboardDocumentList } from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';
import { loadTopic } from '../../store/forum/topic/topic.actions';
import { loadHashtag } from '../../store/forum/hashtag/hashtag.actions';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { Post, PostSearch } from '../../models/forum/Post';
import { PostService } from '../../services/forum/post.service';
import { SearchPostItemComponent } from './components/search-post-item/search-post-item.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.layout.html',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    NgIconComponent,

    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    BreadcrumbComponent,
    SearchPostItemComponent,
  ],
  providers: [provideIcons({ ionHomeOutline, heroClipboardDocumentList, ionDocumentTextOutline })],
  styleUrl: './forum.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumComponent implements OnInit {

  sidebar: boolean = false;

  postSearch$: BehaviorSubject<PostSearch[]> = new BehaviorSubject<PostSearch[]>([]);

  constructor(private _store: Store<AppState>, private _router: Router, private _postService: PostService) {

  }

  ngOnInit(): void {







    this._store.dispatch(loadTopic());
    this._store.dispatch(loadHashtag());
  }




  toggleSideBar() {
    console.log('is toggle');
    this.sidebar = !this.sidebar;
  }

  searchPost(title: string) {
    this._postService.searchPostWithTitle(title).subscribe(data => {
      this.postSearch$.next(data);
    })
  }

}
