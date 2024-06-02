import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
@Component({
  selector: 'app-chapterlist',
  standalone: true,
  imports: [CommonModule, TreeModule],
  templateUrl: './chapterlist.component.html',
  styleUrl: './chapterlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChapterlistComponent implements OnChanges {
  @Input() selectedChapter!: TreeNode;
  chapters: Array<TreeNode[]>;
  constructor() {
    this.chapters = [
      [{
        key: '0',
        label: 'Documents',
        children: [
          {
            key: '0-0',
            label: 'abc',
            type: 'text',
          },
          {
            key: '0-1',
            label: 'abc',
            type: 'text',
          },
          {
            key: '0-2',
            label: 'abc',
            type: 'text',
          },
          {
            key: '0-3',
            label: 'abc',
            type: 'text',
          },
          {
            key: '0-4',
            label: 'abc',
            type: 'text',
          }, {
            key: '0-5',
            label: 'abc',
            type: 'text',
          }, {
            key: '0-6',
            label: 'abc',
            type: 'text',
          }
        ]
      },
      ],
      [{
        key: '1',
        label: 'Documents',
        children: [
          {
            key: '1-0',
            label: 'abc',
            type: 'text',
          },
          {
            key: '1-1',
            label: 'abc',
            type: 'text',
          },
          {
            key: '1-2',
            label: 'abc',
            type: 'text',
          },
          {
            key: '1-3',
            label: 'abc',
            type: 'text',
          },
          {
            key: '1-4',
            label: 'abc',
            type: 'text',
          }, {
            key: '1-5',
            label: 'abc',
            type: 'text',
          }, {
            key: '1-6',
            label: 'abc',
            type: 'text',
          }
        ]
      },
      ]
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }


}
