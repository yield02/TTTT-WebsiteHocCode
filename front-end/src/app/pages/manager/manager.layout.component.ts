import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagerNavbarComponent } from './components/navbar-manager/navbar-manager.component';

@Component({
    selector: 'app-manager.layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,

        ManagerNavbarComponent,
    ],
    templateUrl: './manager.layout.html',
    styleUrl: './manager.layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerLayoutComponent { }
