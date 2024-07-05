import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/Course';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseManagerService {

  constructor(private http: HttpClient) {

  }


  createCourse(course: FormData) {
    return this.http.post<{ course: Course }>(`${environment.apiUrl}course/create`, course,
      {
        withCredentials: true,
      });
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
