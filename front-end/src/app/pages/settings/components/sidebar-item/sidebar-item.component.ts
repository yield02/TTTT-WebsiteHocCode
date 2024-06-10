import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterLinkActive, RouterLink,
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarItemComponent implements AfterViewInit {
  @Input() isMobile: boolean = false;
  @Input() handleOnClick!: Function;
  @Input() naviagtionLink!: string;
  @Input() title!: string;

  ngAfterViewInit() {
    console.log(this.isMobile);
    console.log(this.handleOnClick);
  }

}
