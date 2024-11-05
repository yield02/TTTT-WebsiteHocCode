import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { User } from '../../../../../../models/User';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { AppState } from '../../../../../../store/reducer';
import { select, Store } from '@ngrx/store';
import { selectCourseManagerFromId } from '../../../../../../store/mycoursemanager/mycoursemanager.selectors';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'course-manager-enroll-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    AvatarModule,
    CheckboxModule,
    ChartModule,
    ProgressBarModule,
    FormsModule,
  ],
  templateUrl: './enroll-item.component.html',
  styleUrl: './enroll-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollItemComponent implements OnChanges, OnInit, OnDestroy {
  @Input() user!: User;
  @Input() checkAll!: Boolean;

  @Output() addCheck = new EventEmitter<String>();
  @Output() removeCheck = new EventEmitter<String>();

  isCheck: Boolean = false;

  exerciseData: any;
  optionsExerciseChart: any;

  studyProgress: number = 50;


  selectCourseManagerSubscription!: Subscription;

  constructor(private _store: Store<AppState>, private _activatedRoute: ActivatedRoute, private _changeDetector: ChangeDetectorRef) {

  }


  ngOnInit(): void {


    const course_id = this._activatedRoute.snapshot.params['courseId']


    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');



    this.optionsExerciseChart = {
      cutout: '60%',
      plugins: {
        legend: {
          display: false
        }
      }
    };

    this.selectCourseManagerSubscription = this._store.pipe(select(selectCourseManagerFromId(course_id))).subscribe(course => {
      this.studyProgress = Math.round(((Number(this.user.learning?.completed_lessons.length) || 0) / Number(course?.totalLesson || 0)) * 100);

      const totalRightQuestion = this.user.exercises?.filter(exercise => exercise.status).length || 0;
      const totalWrongQuestion = this.user.exercises?.filter(exercise => !exercise.status).length || 0;

      this.exerciseData = {
        labels: ['Hoàn thành', 'Sai', 'Chưa hoàn thành'],
        datasets: [
          {
            data: [totalRightQuestion, totalWrongQuestion, Number(course?.totalQuestion) - totalRightQuestion - totalWrongQuestion],
            backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--red-500'), documentStyle.getPropertyValue('--gray-500')],
            hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--gray-400')]
          }
        ]
      }
      this._changeDetector.detectChanges();
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkAll']) {
      this.isCheck = this.checkAll;
      if (this.isCheck) {
        this.addCheck.emit(this.user._id);
      }
      else {
        this.removeCheck.emit(this.user._id);
      }
    }
  }
  onChangeCheckBox() {
    this.isCheck = !this.isCheck;
    if (this.isCheck) {
      this.addCheck.emit(this.user._id);
    }
    else {
      this.removeCheck.emit(this.user._id);
    }
  }

  showInformationDialog() {
  }

  ngOnDestroy() {
    this.selectCourseManagerSubscription.unsubscribe();
  }


}
