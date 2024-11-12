import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-report-manager',
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
    templateUrl: './report-manager.component.html',
    styleUrl: './report-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportManagerComponent {
    isSearching: boolean = false;

    searchReport: FormControl = new FormControl('');


    toggleSearching() {
        this.isSearching = !this.isSearching;
    }

    fieldFilterChange(event: any) {

    }

    typeFilterChange(event: any) {

    }
}



