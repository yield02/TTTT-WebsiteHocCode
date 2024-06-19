import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionNewspaperOutline } from '@ng-icons/ionicons';
import { heroAcademicCap, heroCodeBracketSquare } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'activities-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    SidebarItemComponent,
    NgIconComponent
  ],
  providers: [provideIcons({ heroCodeBracketSquare, heroAcademicCap, ionNewspaperOutline })],
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
