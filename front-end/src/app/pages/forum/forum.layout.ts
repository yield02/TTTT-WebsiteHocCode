import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.layout.html',
  styleUrl: './forum.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumComponent { }
