import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Exercise } from '../models/Exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private _http: HttpClient) {


  }

  getExercisesByCourseId(courseId: string, user_id?: string): Observable<Exercise[]> {
    return this._http.get<Exercise[]>(`${environment.apiUrl}exercise/course/${courseId}/${user_id}`, { withCredentials: true });
  }

  getExerciseByChapterId(chapterId: string, user_id?: string): Observable<Exercise[]> {
    return this._http.get<Exercise[]>(`${environment.apiUrl}exercise/chapter/${chapterId}/${user_id}`, { withCredentials: true });
  }

  createExercise(exercise: Exercise): Observable<Exercise[]> {
    return this._http.post<Exercise[]>(`${environment.apiUrl}exercise`, exercise, { withCredentials: true });
  }
  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this._http.patch<Exercise>(`${environment.apiUrl}exercise/${exercise._id}`, exercise, { withCredentials: true });
  }

  createOrUpdateExercise(exercise: Exercise): Observable<Exercise> {
    return this._http.put<Exercise>(`${environment.apiUrl}exercise/${exercise?._id}`, exercise, { withCredentials: true });
  }

}
