import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { Add } from '../store/mycoursemanager/mycoursemanager.actions';
import { User } from '../models/User';
import { Filter, filterToString } from '../models/Filter';

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
  getCourseManagerFromCourseId(courseId: String): Observable<Course> {
    return this.http.get<Course>(`${environment.apiUrl}course/${courseId}`);
  }

  updateCourse(course: FormData) {
    return this.http.patch<{ course: Course }>(`${environment.apiUrl}course/update`, course,
      {
        withCredentials: true,
      });
  }

  acceptEnroll(course_id: String, enrolls_id: String[]): Observable<Course> {
    return this.http.patch<Course>(`${environment.apiUrl}course/enroll/accept/${course_id}`, { user_id: enrolls_id },
      {
        withCredentials: true,
      });
  }

  rejectEnroll(course_id: String, enrolls_id: String[]): Observable<Course> {
    return this.http.patch<Course>(`${environment.apiUrl}course/enroll/reject/${course_id}`, { user_id: enrolls_id },
      {
        withCredentials: true,
      });
  }

  findUsersWithUserName(username: String, course_id: String, typeList: 'enroll' | 'waiting_enroll'): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}user/course?course_id=${course_id}&typeList=${typeList}&username=${username}`, {
      withCredentials: true,
    });
  }

  getUsersInCourse(course_id: String, filter: Filter, typeList: 'enroll' | 'waiting_enroll'): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}user/course/${course_id}/?filter=${JSON.stringify(filter)}&typeList=${typeList}`, {
      withCredentials: true,
    });
  }

  deleteUserEnrollFromAuth(course_id: String, users_id: String[]): Observable<Course> {
    return this.http.patch<Course>(`${environment.apiUrl}course/enroll/delete/${course_id}`, { users_id }, {
      withCredentials: true,
    });
  }




} 
