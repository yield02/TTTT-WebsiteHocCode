import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-learning',
  template: `<p>learning works!</p>`,
  styleUrl: './learning.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningComponent { }
