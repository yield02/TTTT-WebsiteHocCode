import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post } from '../../models/forum/Post';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPostService {

  constructor(private _http: HttpClient) { }




  getPosts(): Observable<Post[]> {
    return this._http.get<Post[]>(`${environment.apiUrl}manager/post`, { withCredentials: true });
  }

  updateStatus(post_ids: string[], status: "waiting" | "allow" | "block", reason?: string): Observable<any> {
    return this._http.patch<any>(`${environment.apiUrl}manager/post/updateStatus`, { post_ids, status, reason }, { withCredentials: true });
  }

  deletePosts(ids: string[]): Observable<any> {
    return this._http.delete(`${environment.apiUrl}manager/post/deletemany/${JSON.stringify(ids)}`, { withCredentials: true });
  }

}



