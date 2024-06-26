import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'course-manager-rating-item',
  standalone: true,
  imports: [
    CommonModule,
    AvatarModule,
    RatingModule,
    FormsModule
  ],
  templateUrl: './rating-item.component.html',
  styleUrl: './rating-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingItemComponent {
  rating: Number = 3;
}
