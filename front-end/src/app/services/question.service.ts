import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Question } from '../models/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }


  getQuestionsFromLessonId(lesson_id: string): Observable<Question[]> {

    const lessons_id = [lesson_id.trim()];

    return this._http.get<Question[]>(`${environment.apiUrl}question/lessons/${JSON.stringify(lessons_id)}`);
  }

  createQuestions(questions: Question[]): Observable<Question[]> {
    return this._http.post<Question[]>(`${environment.apiUrl}question/createMany`, questions, {
      withCredentials: true,
    });
  }

  updateQuestion(question: Question): Observable<Question> {
    return this._http.patch<Question>(`${environment.apiUrl}question/update/${question._id}`, question, {
      withCredentials: true,
    });
  }

  deleteQuestions(question_ids: string[]) {
    return this._http.delete(`${environment.apiUrl}question/${JSON.stringify(question_ids)}`, {
      withCredentials: true,
    });
  }

}
