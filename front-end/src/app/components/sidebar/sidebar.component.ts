import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionChatboxOutline, ionHomeOutline } from '@ng-icons/ionicons';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIconComponent, RouterLinkActive, RouterLink, SidebarModule],
  providers: [provideIcons({ ionHomeOutline, ionChatboxOutline })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  @Input() sidebarVisible: boolean = false;


}
