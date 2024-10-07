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
import { tap } from 'rxjs';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';

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
    BreadcrumbComponent
  ],
  providers: [provideIcons({ ionHomeOutline, heroClipboardDocumentList, ionDocumentTextOutline })],
  styleUrl: './forum.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumComponent implements OnInit {

  sidebar: boolean = false;


  constructor(private _store: Store<AppState>, private _router: Router) {

  }

  ngOnInit(): void {







    this._store.dispatch(loadTopic());
    this._store.dispatch(loadHashtag());
  }




  toggleSideBar() {
    console.log('is toggle');
    this.sidebar = !this.sidebar;
  }

}
