import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManagerNavbarComponent } from './components/navbar-manager/navbar-manager.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-manager.layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,

        ManagerNavbarComponent,
        ConfirmDialogModule,
    ],
    templateUrl: './manager.layout.html',
    providers: [ConfirmationService],
    styleUrl: './manager.layout.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagerLayoutComponent { }
