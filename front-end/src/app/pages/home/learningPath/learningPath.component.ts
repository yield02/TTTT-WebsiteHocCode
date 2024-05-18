import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-learning-path',
  templateUrl: './learningPath.component.html',
  styleUrl: './learningPath.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPathComponent { }
