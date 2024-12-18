import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AuthService } from '../../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { AuthUser } from '../../../models/User';
import { ionLogOutOutline, ionNewspaperOutline, ionPersonCircleOutline, ionSettingsOutline, ionShieldOutline } from '@ng-icons/ionicons';
import { heroAcademicCap } from '@ng-icons/heroicons/outline';


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
  providers: [
    provideIcons({
      ionPersonCircleOutline,
      heroAcademicCap,
      ionNewspaperOutline,
      ionSettingsOutline,
      ionLogOutOutline,
      ionShieldOutline,
    })
  ],
  templateUrl: './avatar-menu.component.html',
  styleUrl: './avatar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarMenuComponent implements OnDestroy {
  $observer: Subscription = new Subscription();

  $user: Observable<AuthUser> = this._store.select(state => state.user);

  constructor(private authService: AuthService, private _store: Store<AppState>) {

  }

  logOut(): void {
    this.$observer = this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.$observer.unsubscribe();
  }
}
