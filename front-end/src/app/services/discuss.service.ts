import { Injectable } from '@angular/core';
import { Discuss } from '../models/Discuss';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DeleteDiscussByAuthor } from '../store/discuss/discuss.actions';

@Injectable({
  providedIn: 'root'
})
export class DiscussService {

  constructor(private _http: HttpClient) { }


  createDiscuss(discuss: Discuss): Observable<Discuss> {
    return this._http.post<Discuss>(`${environment.apiUrl}discuss/create`, { discuss: discuss }, { withCredentials: true });
  }

  getDiscussesFromLessonId(lesson_id: String): Observable<Discuss[]> {
    return this._http.get<{ discusses: Discuss[] }>(`${environment.apiUrl}discuss/lesson/${lesson_id}`, { withCredentials: true }).pipe(map(data => data.discusses));
  }

  updateContentDiscuss(discuss: Discuss): Observable<Discuss> {
    return this._http.patch<Discuss>(`${environment.apiUrl}discuss/${discuss._id}`, { content: discuss.content }, { withCredentials: true });
  }

  DeleteDiscussByAuthor(discuss_id: String): Observable<Discuss> {
    return this._http.delete<Discuss>(`${environment.apiUrl}discuss/${discuss_id}`, { withCredentials: true });
  }

  InteractDiscuss(discuss_id: String): Observable<Discuss> {
    return this._http.patch<Discuss>(`${environment.apiUrl}discuss/likes/${discuss_id}`, null, { withCredentials: true });
  }

}
