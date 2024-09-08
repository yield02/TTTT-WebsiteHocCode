import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LearningInterFace } from '../models/Learning';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  constructor(private _http: HttpClient) { }


  getLearning(course_id: String): Observable<LearningInterFace> {
    return this._http.get<LearningInterFace>(`${environment.apiUrl}learning/${course_id}`, {
      withCredentials: true
    });
  }

  updateAndCreateLearning(course_id: String, chapter_id: String, lesson_id: String, learning_id?: String): Observable<LearningInterFace> {
    return this._http.put<LearningInterFace>(`${environment.apiUrl}learning/update/${course_id}`, { lesson_id, learning_id, chapter_id }, { withCredentials: true });
  }

  fetchLearnings(): Observable<LearningInterFace[]> {
    return this._http.get<LearningInterFace[]>(`${environment.apiUrl}learning/user`, {
      withCredentials: true
    });
  }

}
