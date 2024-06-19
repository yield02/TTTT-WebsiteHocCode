import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'myacc-mypost',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>mypost works!</p>`,
  styleUrl: './mypost.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MypostComponent { }
