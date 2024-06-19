import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './myactivities.layout.html',
  styleUrl: './myactivities.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForumComponent {

  sidebarVisible: boolean = false;
  sidebarToggle(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
