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
}
