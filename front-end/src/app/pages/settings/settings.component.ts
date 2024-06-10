import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {

  sidebarVisible: boolean = false;
  sidebarToggle(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
