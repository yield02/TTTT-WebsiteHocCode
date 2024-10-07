import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../../models/forum/Comment';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: HttpClient) { }


  createComment(comment: Comment, reply_id?: string): Observable<Comment> {
    return this._http.post<Comment>(`${environment.apiUrl}comment`, { ...comment, reply_id },
      {
        withCredentials: true,
      });
  }
  getCommentsByPostId(post_id: string): Observable<{ data: Comment[], totalComments: number }> {
    return this._http.get<{ data: Comment[], totalComments: number }>(`${environment.apiUrl}comment/post/${post_id}`);
  }

  deleteComment(comment_id: string, reply_id?: string): Observable<Comment> {
    return this._http.delete<Comment>(`${environment.apiUrl}comment/${comment_id}/${reply_id}`, {
      withCredentials: true,
    });
  }

  interactWithComment(comment_id: string) {
    return this._http.patch<Comment>(`${environment.apiUrl}comment/interact/${comment_id}`, {}, {
      withCredentials: true,
    });
  }

  editContentComment(comment: Comment) {
    return this._http.patch<Comment>(`${environment.apiUrl}comment/content/${comment._id}`, comment, {
      withCredentials: true,
    });
  }

}
