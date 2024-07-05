import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionLogOutOutline, ionPersonCircleOutline } from '@ng-icons/ionicons';
import { bootstrapShield } from '@ng-icons/bootstrap-icons';
import { SidebarItemComponent } from '../../../../components/sidebar-item/sidebar-item.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    NgIconComponent,

    SidebarItemComponent,
  ],
  providers: [provideIcons({ ionPersonCircleOutline, bootstrapShield, ionLogOutOutline }), AuthService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() sidebarVisible!: boolean;


  constructor(private authService: AuthService) {

  }

  signOut(): void {
    this.authService.logOut();
  }
}
