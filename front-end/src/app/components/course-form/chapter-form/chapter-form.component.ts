import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-chapter-form',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './chapter-form.component.html',
  styleUrl: './chapter-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterFormComponent implements OnInit {

  chapterTitle!: String;

  constructor(public ref: DynamicDialogRef, private _dialogConfig: DynamicDialogConfig) {

  }

  ngOnInit(): void {
    if (this._dialogConfig?.data?.chapterTitle) {
      this.chapterTitle = this._dialogConfig.data.chapterTitle;
    }
  }

  closeForm() {
    this.ref.close();
  }

  saveChapter(): void {
    this.ref.close(this.chapterTitle);
  }

}
