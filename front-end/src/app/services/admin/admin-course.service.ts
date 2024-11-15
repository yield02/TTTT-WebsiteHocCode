import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../../models/Course';
import { Lesson } from '../../models/Lesson';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseService {

  constructor(private _http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this._http.get<Course[]>(`${environment.apiUrl}manager/course/courses`, { withCredentials: true });
  }

  getLessons(): Observable<Lesson[]> {
    return this._http.get<Lesson[]>(`${environment.apiUrl}manager/course/lessons`, { withCredentials: true });
  }

  updateStatus(course_ids: string[], state: "waiting" | "active" | "banned", reason?: string) {
    return this._http.patch<any>(`${environment.apiUrl}manager/course/courses/updateStatus`, { course_ids, state, reason }, { withCredentials: true });
  }

  deleteCourse(course_ids: string[]) {
    return this._http.delete<any>(`${environment.apiUrl}manager/course/courses/deletemany/${JSON.stringify(course_ids)}`, { withCredentials: true });
  }

}
