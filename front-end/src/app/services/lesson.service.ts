import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLessonInterface, Lesson, UpdateLessonInterface } from '../models/Lesson';
import { environment } from '../../environments/environment';
import { Chapter } from '../models/Chapter';




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
    return this.http.get<{ lessons: Lesson[] }>(`${environment.apiUrl}lesson/chapter/${chapter_id}`, {
      withCredentials: true,
    });
  }

  getLessonsByCourseId(course_id: String): Observable<Lesson[]
  > {
    return this.http.get<Lesson[]>(`${environment.apiUrl}lesson/course/${course_id}`, {
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

  sortLesson(chapter_id: string, lessons_id: string[]): Observable<Chapter> {
    return this.http.patch<Chapter>(`${environment.apiUrl}lesson/sort/${chapter_id}`, { lessons_id }, { withCredentials: true });
  }

  toggleUpdatePublish(lessons_id: string[], state?: string): Observable<Lesson[]> {
    return this.http.patch<Lesson[]>(`${environment.apiUrl}lesson/publish/${JSON.stringify(lessons_id)}`, { state }, { withCredentials: true });
  }

  deleteLessons(lessons_id: string[]) {
    return this.http.delete(`${environment.apiUrl}lesson/deletes/${JSON.stringify(lessons_id)}`, { withCredentials: true });
  }

}
