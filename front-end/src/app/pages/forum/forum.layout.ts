import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { SearchComponent } from '../../components/Search/Search.component';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline, ionHomeOutline } from '@ng-icons/ionicons';
import { heroClipboardDocumentList } from '@ng-icons/heroicons/outline';

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
  ],
  providers: [provideIcons({ ionHomeOutline, heroClipboardDocumentList, ionDocumentTextOutline })],
  styleUrl: './forum.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumComponent implements OnInit {

  sidebar: boolean = false;
  itemsBreadcrumb: MenuItem[] = [];



  ngOnInit(): void {
    this.itemsBreadcrumb = [
      {
        icon: 'ionHomeOutline',
        route: '/forum'
      },
      {
        label: 'Topic',
        icon: 'heroClipboardDocumentList',
        route: '/forum/topic/abc'
      },
      {
        label: 'Post',
        icon: 'ionDocumentTextOutline',
        route: '/forum/post/abc'
      },

    ]
  }


  toggleSideBar() {
    console.log('is toggle');
    this.sidebar = !this.sidebar;
  }

}
