import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatboxOutline, ionHomeOutline } from '@ng-icons/ionicons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, RouterLinkActive, RouterLink],
  providers: [provideIcons({ ionHomeOutline, ionChatboxOutline })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent { }
