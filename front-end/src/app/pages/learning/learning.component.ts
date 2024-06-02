import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { LearningHeaderComponent } from './components/learning-header/learning-header.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { ChapterlistComponent } from './components/chapterlist/chapterlist.component';
import { SidebarModule } from 'primeng/sidebar';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-learning',
  standalone: true,
  imports: [
    CommonModule,
    LearningHeaderComponent,
    LessonComponent,
    ChapterlistComponent,
    SidebarModule,
  ],

  templateUrl: './learning.component.html',
  styleUrl: './learning.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningComponent implements AfterViewInit {

  @ViewChild('content') content!: ElementRef<HTMLDivElement>;
  @ViewChild('lessonBar') lessonBar!: ElementRef<HTMLDivElement>;
  @ViewChild('chapterlist') chapterlist!: ElementRef<CommonModule>;

  selectedChapter!: TreeNode;
  sidebarVisible: boolean = false;

  ngAfterViewInit(): void {
    console.log(this.lessonBar);
  }

  toggleLessonBar() {
    this.lessonBar.nativeElement.hidden = !this.lessonBar.nativeElement.hidden;
    if (this.lessonBar.nativeElement.hidden) {
      this.content.nativeElement.classList.remove('lg:col-span-3');
      this.content.nativeElement.classList.add('col-span-4');
    }
    else {
      this.content.nativeElement.classList.remove('col-span-4');
      this.content.nativeElement.classList.add('lg:col-span-3');
    }
  }
  toggleLessonSideBar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
