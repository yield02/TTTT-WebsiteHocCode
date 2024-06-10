import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { ionLockClosedOutline, ionLogOutOutline, ionLogoFacebook, ionLogoGithub, ionLogoGoogle, ionMenuSharp, ionNewspaperOutline, ionNotificationsOutline, ionPersonCircleOutline, ionPersonOutline, ionSearchOutline, ionSettingsOutline, ionThermometerOutline } from '@ng-icons/ionicons';
import { heroAcademicCap } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    LoginComponent,
    SignupComponent,
    NgIconComponent,
    AnnouncementComponent,
    AvatarMenuComponent
  ],
  providers: [provideIcons({
    ionMenuSharp, ionPersonCircleOutline, heroAcademicCap, ionNewspaperOutline, ionSettingsOutline, ionLogOutOutline,
  })],
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit {

  @Input() toggleSideBar!: Function;

  @ViewChild('login') login!: LoginComponent;
  @ViewChild('signup') logout!: SignupComponent;

  constructor() {

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
