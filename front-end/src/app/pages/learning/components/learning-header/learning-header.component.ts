import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionMenuOutline } from '@ng-icons/ionicons';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { AppState } from '../../../../store/reducer';
import { Course } from '../../../../models/Course';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-learning-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgIconComponent,
    ButtonModule
  ],
  providers: [provideIcons({ ionMenuOutline })],
  templateUrl: './learning-header.component.html',
  styleUrl: './learning-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningHeaderComponent implements OnInit {
  @Input() toggleLessonBar!: Function;
  @Input() toggleLessonSideBar!: Function;


  course$!: Observable<Course | undefined>

  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    const course_id = this._activatedRoute.snapshot.paramMap.get('courseId');
    this.course$ = this._store.select(state => state.courses.find(course => course._id === course_id));
  }

}
