import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../../models/forum/Comment';

@Injectable({
  providedIn: 'root'
})
export class AdminCommentService {

  constructor(private _http: HttpClient) { }


  getComments(): Observable<Comment[]> {
    return this._http.get<Comment[]>(`${environment.apiUrl}manager/comment`, { withCredentials: true });
  }

  updateStatus(comment_ids: string[], status: "allow" | "block", reason?: string): Observable<any> {
    return this._http.patch<any>(`${environment.apiUrl}manager/comment/updateStatus`, { comment_ids, status, reason }, { withCredentials: true });
  }

  deleteComment(comment_ids: string[]): Observable<any> {
    return this._http.delete<any>(`${environment.apiUrl}manager/comment/deletemany/${JSON.stringify(comment_ids)}`, { withCredentials: true });
  }




}
