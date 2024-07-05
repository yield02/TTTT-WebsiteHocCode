import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-error-message-form',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `
    <span class="error-message py-2 text-red italic">
        {{ message }}
    </span>

    `,
    styleUrl: './error-message-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageFormComponent {
    @Input() message!: String;

    setMessage(message: String) {
        this.message = message;
    }
}
