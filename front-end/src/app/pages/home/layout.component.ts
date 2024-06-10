import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayOutComponent {
  sidebarVisible: boolean = false;
  sidebarToggle(): void {
    this.sidebarVisible = !this.sidebarVisible;
    console.log(this.sidebarVisible);
  }
}
