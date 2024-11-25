import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LearningInterFace } from '../models/Learning';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  constructor(private _http: HttpClient, private _courseService: CourseService) { }


  getLearning(course_id: String): Observable<LearningInterFace> {
    return this._http.get<LearningInterFace>(`${environment.apiUrl}learning/${course_id}`, {
      withCredentials: true
    });
  }

  updateAndCreateLearning(course_id: String, chapter_id: String, lesson_id: String, learning_id?: String): Observable<LearningInterFace> {
    // throw new Error('Method not implemented.');
    return this._courseService.checkUserEnroll(course_id as string).pipe(switchMap((result) => {
      if (!result) {
        throw new Error('User not enroll');
      }
      return this._http.put<LearningInterFace>(`${environment.apiUrl}learning/update/${course_id}`, { lesson_id, learning_id, chapter_id }, { withCredentials: true });
    }));
    // return this._http.put<LearningInterFace>(`${environment.apiUrl}learning/update/${course_id}`, { lesson_id, learning_id, chapter_id }, { withCredentials: true });
  }

  fetchLearnings(): Observable<LearningInterFace[]> {
    return this._http.get<LearningInterFace[]>(`${environment.apiUrl}learning/user`, {
      withCredentials: true
    });
  }

}
