import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { ionLogOutOutline, ionMenuSharp, ionNewspaperOutline, ionPersonCircleOutline, ionPersonOutline, ionSearchOutline, ionSettingsOutline, ionThermometerOutline } from '@ng-icons/ionicons';
import { heroAcademicCap } from '@ng-icons/heroicons/outline';
import { Store } from '@ngrx/store';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent,

    LoginComponent,
    SignupComponent,
    AnnouncementComponent,
    AvatarMenuComponent
  ],
  providers: [provideIcons({
    ionMenuSharp, ionPersonCircleOutline, heroAcademicCap, ionNewspaperOutline, ionSettingsOutline, ionLogOutOutline,
  })],
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit {
  $isAuth: Observable<boolean>;


  @Input() toggleSideBar!: Function;

  @ViewChild('login') login!: LoginComponent;
  @ViewChild('signup') logout!: SignupComponent;



  constructor(private store: Store<{ user: User }>, private authService: AuthService, private route: ActivatedRoute) {
    this.$isAuth = this.store.pipe(map(({ user }) => {
      if (user._id) {
        return true
      }
      return false;
    }));
  }

  ngOnInit(): void {
    this.$isAuth.pipe(switchMap((isAuth) => {
      if (!isAuth) {
        return this.authService.isAuth();
      }
      return of(false);
    })).subscribe()
  }


  ngAfterViewInit(): void {

  }

  toLogin(): void {
    this.login.toggleDialog();
    this.logout.toggleDialog();
  }
  toSignup(): void {
    this.login.toggleDialog();
    this.logout.toggleDialog();
  }

}
