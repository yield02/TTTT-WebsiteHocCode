import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-overview-manager',
    standalone: true,

    imports: [
        CommonModule,
        PaginatorModule,
        NgIconComponent,
        ReactiveFormsModule,
        OverlayPanelModule,
        DropdownModule,
    ],
    providers: [provideIcons({
        ionSearchOutline,
        ionFilterOutline
    })],
    templateUrl: './overview-manager.component.html',
    styleUrl: './overview-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewManagerComponent {

    isSearching: boolean = false;

    searchCourse: FormControl = new FormControl('');


    toggleSearching() {
        this.isSearching = !this.isSearching;
    }

    fieldFilterChange(event: any) {

    }

    typeFilterChange(event: any) {

    }
}
