import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink
    ],
    templateUrl: `./error.component.html`,
    styleUrl: './error.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent { }
