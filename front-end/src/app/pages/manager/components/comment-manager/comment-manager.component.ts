import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionFilterOutline, ionSearchOutline } from '@ng-icons/ionicons';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';

@Component({
    selector: 'app-comment-manager',
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
    templateUrl: './comment-manager.component.html',
    styleUrl: './comment-manager.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentManagerComponent {
    isSearching: boolean = false;

    searchComment: FormControl = new FormControl('');


    toggleSearching() {
        this.isSearching = !this.isSearching;
    }

    fieldFilterChange(event: any) {

    }

    typeFilterChange(event: any) {

    }
}
