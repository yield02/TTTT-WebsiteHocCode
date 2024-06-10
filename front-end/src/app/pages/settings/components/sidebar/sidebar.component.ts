import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionLogOutOutline, ionPersonCircleOutline } from '@ng-icons/ionicons';
import { bootstrapShield } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    SidebarItemComponent,
    NgIconComponent
  ],
  providers: [provideIcons({ ionPersonCircleOutline, bootstrapShield, ionLogOutOutline })],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() sidebarVisible!: boolean;

  signOut(): void {
    console.log('ok');
  }
}
