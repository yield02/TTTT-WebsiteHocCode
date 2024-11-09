import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './myactivities.layout.html',
  styleUrl: './myactivities.layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivitiesComponent {

  sidebarVisible: boolean = false;
  sidebarToggle(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
