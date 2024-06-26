import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-chapter-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './chapter-form.component.html',
  styleUrl: './chapter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterFormComponent {

  constructor(public ref: DynamicDialogRef) {

  }

  closeForm() {
    this.ref.close();
  }

}
