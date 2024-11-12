import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { bootstrapFileEarmarkPost, bootstrapFileEarmarkPostFill } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroAcademicCap } from '@ng-icons/heroicons/outline';
import { heroAcademicCapSolid } from '@ng-icons/heroicons/solid';
import { ionBarChart, ionBarChartOutline, ionChatbubblesSharp, ionPerson, ionWarning } from '@ng-icons/ionicons';
import { AvatarModule } from 'primeng/avatar';
import { AvatarMenuComponent } from '../../../../components/header/avatar-menu/avatar-menu.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducer';
import { Observable } from 'rxjs';
import { AuthUser } from '../../../../models/User';

@Component({
    selector: 'app-navbar-manager',
    standalone: true,
    imports: [
        CommonModule,
        NgIconComponent,
        RouterLink,
        RouterLinkActive,
        AvatarModule,

        AvatarMenuComponent,
    ],
    providers: [provideIcons({
        ionBarChart,
        ionWarning,
        heroAcademicCapSolid,
        ionChatbubblesSharp,
        bootstrapFileEarmarkPost,
        ionPerson
    })],
    templateUrl: './navbar-manager.component.html',
    styleUrl: './navbar-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerNavbarComponent {

    authUser$: Observable<AuthUser> = this._store.select(state => state.user);

    constructor(private _store: Store<AppState>) {

    }



}
