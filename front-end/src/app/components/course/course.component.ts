import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { bootstrapHeart, bootstrapHeartbreak } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroAcademicCap } from '@ng-icons/heroicons/outline';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressBarModule } from 'primeng/progressbar';
import { Course } from '../../models/Course';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LearningInterFace } from '../../models/Learning';
import { AppState } from '../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectLearningFromCourseId } from '../../store/learning/learning.selectors';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    NgIconComponent,
    PaginatorModule,
    ButtonModule,
    ProgressBarModule,
    RouterLink
  ],
  providers: [provideIcons({ heroAcademicCap, bootstrapHeart, bootstrapHeartbreak })],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  @Input() type: 'introduce' | 'learning' = 'introduce';
  @Input() course!: Course;

  learning$?: Observable<LearningInterFace | undefined>;


  constructor(private _store: Store<AppState>) {



  }


  ngOnInit(): void {

    this.learning$ = this._store.pipe(select(selectLearningFromCourseId(this.course._id!)));

  }

  calculatorLearning(learning: LearningInterFace): number {

    return (learning.completed_lessons.length * 100) / learning.total_lesson!;
  }
}
