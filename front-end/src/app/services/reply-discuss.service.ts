import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateReplyDiscussInterface, ReplyDiscuss } from '../models/ReplyDiscuss';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplyDiscussService {

  constructor(private _http: HttpClient) {

  }


  FetchReplyDiscusses(discusses_id: String[]): Observable<ReplyDiscuss[]> {
    return this._http.get<ReplyDiscuss[]>(`${environment.apiUrl}reply-discuss/?replyDiscusses_id=${JSON.stringify(discusses_id)}`, { withCredentials: true });
  }

  CreateReplyDiscuss(replyDiscuss: CreateReplyDiscussInterface): Observable<ReplyDiscuss> {
    return this._http.post<ReplyDiscuss>(`${environment.apiUrl}reply-discuss`, replyDiscuss, { withCredentials: true });
  }

  UpdateReplyDiscuss(replyDiscuss: ReplyDiscuss): Observable<ReplyDiscuss> {
    return this._http.patch<ReplyDiscuss>(`${environment.apiUrl}reply-discuss/${replyDiscuss._id}`, { content: replyDiscuss.content }, { withCredentials: true });
  }

  DeleteReplyDiscuss(replyDiscuss_id: String, discuss_id: String): Observable<ReplyDiscuss> {
    return this._http.delete<ReplyDiscuss>(`${environment.apiUrl}reply-discuss/${discuss_id}/${replyDiscuss_id}`, { withCredentials: true });
  }

  InteractReplyDiscuss(replyDiscuss_id: String): Observable<ReplyDiscuss> {
    return this._http.patch<ReplyDiscuss>(`${environment.apiUrl}reply-discuss/likes/${replyDiscuss_id}`, null, { withCredentials: true });
  }


}
