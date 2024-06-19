import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'mycourses-board-item',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardItemComponent {
  @Input() type: string = 'primary'; // primary | success | danger | warning 
  @Input() quantity: number = 0;
  @Input() title: string = 'Tổng số khóa học';
}
