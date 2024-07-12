import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Add } from '../store/mycoursemanager/mycoursemanager.actions';

@Injectable({
  providedIn: 'root'
})
export class CourseManagerService {

  constructor(private http: HttpClient, private store: Store<{ myCourseManager: Course[] }>) {

  }


  createCourse(course: FormData) {
    return this.http.post<{ course: Course }>(`${environment.apiUrl}course/create`, course,
      {
        withCredentials: true,
      });
  }

  getCourse(course_id: String): Observable<Course | null> {
    return this.http.get<Course>(`${environment.apiUrl}course/${course_id}`, {
      withCredentials: true,
    }).pipe(tap(data => {
      this.store.dispatch(Add({ courses: [data] }));
    }), catchError(() => {
      return of(null);
    }));
  }

  getCourses() {
    return this.http.get<{ courses: Course[] }>(`${environment.apiUrl}course/author`, {
      withCredentials: true,
    });
  }

  updateCourse(course: FormData) {
    return this.http.patch<{ course: Course }>(`${environment.apiUrl}course/update`, course,
      {
        withCredentials: true,
      });
  }
} 
