import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/forum/Post';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }



  createPost(post: Post) {
    return this.http.post<Post>(`${environment.apiUrl}post`, post,
      {
        withCredentials: true,
      });
  }

  getPostWithId(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiUrl}post/${id}`, { withCredentials: true });
  };


  editContentPost(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.apiUrl}post/content/${post.post_id}`, post, { withCredentials: true });
  }

  deletePost(post_id: number): Observable<Post> {
    return this.http.delete<Post>(`${environment.apiUrl}post/${post_id}`, { withCredentials: true });
  }


}
