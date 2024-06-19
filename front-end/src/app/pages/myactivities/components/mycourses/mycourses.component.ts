import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardItemComponent } from './board-item/board-item.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'myacc-mycourses',
  standalone: true,
  imports: [
    CommonModule,
    BoardItemComponent,
    CourseItemComponent,
    DataViewModule,
    FormsModule,
    InputTextModule
  ],
  templateUrl: `./mycourses.component.html`,
  styleUrl: './mycourses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MycoursesComponent {
  courses!: { name: string; rating: number }[];
  searchValue: String = '';


  constructor() {
    this.courses = [
      {
        name: 'Course 1',
        rating: 4.5
      },
      {
        name: 'Course 2',
        rating: 3.7
      },
      {
        name: 'Course 3',
        rating: 4.9
      },
      {
        name: 'Course 4',
        rating: 4.2
      },
      {
        name: 'Course 5',
        rating: 3.8
      },
      {
        name: 'Course 1',
        rating: 4.5
      },
      {
        name: 'Course 2',
        rating: 3.7
      },
      {
        name: 'Course 3',
        rating: 4.9
      },
      {
        name: 'Course 4',
        rating: 4.2
      },
      {
        name: 'Course 5',
        rating: 3.8
      }
    ];
  }




}
