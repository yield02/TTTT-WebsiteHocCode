import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ionNotificationsOutline } from '@ng-icons/ionicons';
import { DialogModule } from 'primeng/dialog';
import { AppState } from '../../../store/reducer';
import { Store } from '@ngrx/store';
import { deleteAnnouncements, getAnnouncements, stateChangeAnnouncement } from '../../../store/user/user.actions';
import { AnnouncementItemComponent } from './announcement-item/announcement-item.component';
import { Observable, tap } from 'rxjs';
import { Announcement } from '../../../models/User';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    MatButtonModule,
    MatMenuModule,
    DialogModule,
    ButtonModule,
    MenuModule,

    AnnouncementItemComponent,
  ],
  providers: [provideIcons({ ionNotificationsOutline })]
  ,
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('notifyMenu') notifyMenu!: ElementRef<HTMLDivElement>;
  @ViewChild('notifyContainer') notifyContainer!: ElementRef<HTMLDivElement>;

  announcement_ids: string[] = [];

  mobileDialog: boolean = false;
  announcements$!: Observable<Announcement[]>;
  actionItems: MenuItem[] = [
    {
      label: 'Đánh dấu tất cả đã đọc',
      icon: 'pi pi-check',
      command: () => {
        this._store.dispatch(stateChangeAnnouncement({ announcement_ids: this.announcement_ids, state: 'read' }));
      }
    },
    {
      label: 'Đánh dấu tất cả chưa đọc',
      icon: 'pi pi-envelope',
      command: () => {
        this._store.dispatch(stateChangeAnnouncement({ announcement_ids: this.announcement_ids, state: 'unread' }));
      }
    },
    {
      label: 'Xóa tất cả thông báo',
      icon: 'pi pi-trash',
      command: () => {
        this._store.dispatch(deleteAnnouncements({ announcement_ids: this.announcement_ids }));
      }
    }

  ];

  constructor(private _store: Store<AppState>) {

  }

  @HostListener('document:click', ['$event'])
  onGlabalClick(event: MouseEvent) {
    if (!this.notifyContainer.nativeElement.contains(event.target as Node)) {
      if (this.notifyMenu.nativeElement.hidden == false) {
        this.notifyMenu.nativeElement.hidden = true;
      }
    }
  }


  ngOnInit(): void {
    this._store.dispatch(getAnnouncements())
    setInterval(() => {
      this._store.dispatch(getAnnouncements())
    }, 30000);
    this.announcements$ = this._store.select(state => state.user.announcement).pipe(tap(
      announcements => {
        this.announcement_ids = announcements.map(item => item._id);
      }
    ));
  }

  ngAfterViewInit(): void {
    this.notifyMenu.nativeElement.hidden = true;
  }



  showMobileDialog() {
    this.mobileDialog = true;
  }
  toggleNotifyMenu() {
    this.notifyMenu.nativeElement.hidden = !this.notifyMenu.nativeElement.hidden;
  }

  ngOnDestroy(): void {
    // this.renderer.destroy();
  }

}
