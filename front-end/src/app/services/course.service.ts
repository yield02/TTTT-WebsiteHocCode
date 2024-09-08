import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {
  }

  getCoursesBySubjectId(subjectId: String): Observable<{ courses: Course[] }> {
    return this.http.get<{ courses: Course[] }>(`${environment.apiUrl}course?subject_id=${subjectId}`);
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
    return this.http.get<Course[]>(`${environment.apiUrl}course/courses/${courseIds}`, {
      withCredentials: true,
    });
  }

}
