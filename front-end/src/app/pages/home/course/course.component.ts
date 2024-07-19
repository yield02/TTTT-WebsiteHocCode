import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { bootstrapPersonVideo } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionDocumentTextOutline } from '@ng-icons/ionicons';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Course } from '../../../models/Course';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducer';
import { selectCourseFromCourseId } from '../../../store/courses/courses.selector';
import { FetchingCourseFromCourseId } from '../../../store/courses/courses.actions';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, TreeModule, NgIconComponent, ButtonModule, FormsModule, RatingModule, RouterLink],
  providers: [provideIcons({ ionDocumentTextOutline, bootstrapPersonVideo })],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {

  rating: number = 4.5;
  chapters: TreeNode[];
  course$!: Observable<Course | undefined>;
  fetched: boolean = false;


  constructor(private _route: ActivatedRoute, private _store: Store<AppState>) {
    this.chapters = []
  }

  ngOnInit(): void {
    const course_id = this._route.snapshot.paramMap.get('courseId');

    this.course$ = this._store.pipe(select(selectCourseFromCourseId(course_id!))).pipe(tap(course => {
      if (!course && !this.fetched) {
        this._store.dispatch(FetchingCourseFromCourseId({ course_id: course_id! }));
      }
    }));

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
