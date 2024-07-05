import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-avatar-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    NgIconComponent,
    RouterLink
  ],
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarMenuComponent implements OnDestroy {
  $observer: Subscription = new Subscription();
  constructor(private authService: AuthService) {

  }

  logOut(): void {
    this.$observer = this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.$observer.unsubscribe();
  }
}
