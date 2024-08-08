import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LayOutComponent {
  sidebarVisible: boolean = false;
  sidebarToggle(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  constructor(private _changeRef: ChangeDetectorRef) {

  }


}
