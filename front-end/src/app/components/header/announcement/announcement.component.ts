import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgIconComponent } from '@ng-icons/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent implements AfterViewInit {
  @ViewChild('notifyMenu') notifyMenu!: ElementRef<HTMLDivElement>;
  @ViewChild('notifyContainer') notifyContainer!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.notifyMenu.nativeElement.hidden = true;
  }

  constructor(private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      const isClickInside: boolean = this.notifyContainer.nativeElement.contains(e.target as Node);
      if (!isClickInside) {
        if (this.notifyMenu.nativeElement.hidden == false) {
          this.notifyMenu.nativeElement.hidden = true;
        }
      }
    })
  }

  toggleNotifyMenu() {
    this.notifyMenu.nativeElement.hidden = !this.notifyMenu.nativeElement.hidden;
  }
}