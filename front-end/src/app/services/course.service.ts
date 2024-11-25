import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, CourseSearch } from '../models/Course';
import { combineLatest, forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducer';
import { selectCourseFromCourseId } from '../store/courses/courses.selector';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private _store: Store<AppState>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  getCoursesBySubjectIds(subjectIds: string[]): Observable<{ courses: Course[] }> {
    return this.http.get<{ courses: Course[] }>(`${environment.apiUrl}course?subject_id=${JSON.stringify(subjectIds)}`);
  }

  getCourseFromCourseId(courseId: String): Observable<Course> {
    return this.http.get<Course>(`${environment.apiUrl}course/${courseId}`);
  }

  UserEnrollCourse(courseId: String): Observable<Course> {
    return this.http.patch<Course>(`${environment.apiUrl}course/enroll/register/${courseId}`, {}, {
      withCredentials: true,
    });
  }

  AcceptEnrollCourse(users_id: String[]): Observable<Course> {
    return this.http.patch<Course>(`${environment.apiUrl}course/enroll/accept`, { users_id }, {
      withCredentials: true,
    });
  };

  getCoursesByCourseIds(courseIds: String[]): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}course/courses/${courseIds.toString()}`, {
      withCredentials: true,
    });
  }

  searchCourseWithCourseName(courseName: String): Observable<CourseSearch[]> {
    return this.http.get<CourseSearch[]>(`${environment.apiUrl}course/search?course_name=${courseName}`);
  }

  checkUserEnroll(course_id: string): Observable<boolean> {
    return combineLatest({
      user: this._store.select('user'),
      course: this._store.pipe(select(selectCourseFromCourseId(course_id as String)))
    }).pipe(map(
      ({ user, course }) => {
        if (user._id && course?.enroll?.includes(user._id) || user?._id == course?.author_id?._id) {
          return true;
        }
        return false;
      }
    ))
  }

}
