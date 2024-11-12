import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-user-manager',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        OverlayPanelModule,
        NgIconComponent,
        DropdownModule,
        PaginatorModule,
    ],
    providers: [provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    templateUrl: './user-manager.component.html',
    styleUrl: './user-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserManagerComponent {
    isSearching: boolean = false;

    searchUser: FormControl = new FormControl('');


    toggleSearching() {
        this.isSearching = !this.isSearching;
    }

    fieldFilterChange(event: any) {

    }

    typeFilterChange(event: any) {

    }
}







