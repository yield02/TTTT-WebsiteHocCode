import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
    selector: 'app-report-dynamic-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        InputTextareaModule,
        FormsModule,
    ],
    templateUrl: './report-dynamic-dialog.component.html',
    styleUrl: './report-dynamic-dialog.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportDynamicDialogComponent {

    reportContent: string = '';
    constructor(private _dynamicDialogRef: DynamicDialogRef, private _dynamicDialogConfig: DynamicDialogConfig) {

    }

    closeDialog() {
        this._dynamicDialogRef.close();
    }

    sendReport() {

        if (this.reportContent.trim() === '') {
            alert('Vui lòng nhập nội dung báo cáo!');
            return;
        }

        this._dynamicDialogRef.close(this.reportContent);
    }
}
