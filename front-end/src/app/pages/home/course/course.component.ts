import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, TreeModule, NgIconComponent, ButtonModule],
  providers: [provideIcons({ ionDocumentTextOutline, bootstrapPersonVideo })],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  chapters: TreeNode[];



  constructor() {
    this.chapters = []
  }

  ngOnInit(): void {
    this.chapters = [
      {
        key: '0',
        label: '1. Khái niệm kỹ thuật cần biết',
        children: [
          {
            key: '0-0', label: '1. Khái niệm kỹ thuật cần biết 1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết 1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết', type: 'video'

          },
          { key: '0-1', label: 'Resume.doc', type: 'text' }
        ]
      },
      {
        key: '1',
        label: '1. Khái niệm kỹ thuật cần biết',
        children: [
          {
            key: '1-0', label: '1. Khái niệm kỹ thuật cần biết 1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết 1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết1. Khái niệm kỹ thuật cần biết', type: 'video'

          },
          { key: '1-1', label: 'Resume.doc', type: 'text' }
        ]
      },
    ]
  }

  expandAll() {
    this.chapters.forEach(node => this.expandRecursive(node, true));
  }

  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
}
