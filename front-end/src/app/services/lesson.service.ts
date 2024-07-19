import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLessonInterface, Lesson, UpdateLessonInterface } from '../models/Lesson';
import { environment } from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) { }


  createLesson(data: CreateLessonInterface): Observable<{ lesson: Lesson }> {
    return this.http.post<{ lesson: Lesson }>(`${environment.apiUrl}lesson/create`, data, {
      withCredentials: true,
    });
  }

  getLessons(chapter_id: String): Observable<{ lessons: Lesson[] }> {
    return this.http.get<{ lessons: Lesson[] }>(`${environment.apiUrl}lesson/${chapter_id}`, {
      withCredentials: true,
    });
  }

  updateLesson(data: UpdateLessonInterface): Observable<{ lesson: Lesson }> {
    return this.http.patch<{ lesson: Lesson }>(`${environment.apiUrl}lesson/${data._id}`, data, {
      withCredentials: true,
    });
  }

  deleteLesson(chapter_id: String, lesson_id: String): Observable<{ lesson: Lesson }> {
    return this.http.delete<{ lesson: Lesson }>(`${environment.apiUrl}lesson/${chapter_id}/${lesson_id}`, {
      withCredentials: true,
    });
  }

}
