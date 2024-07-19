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

}
