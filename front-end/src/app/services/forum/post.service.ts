import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/forum/Post';
import { environment } from '../../../environments/environment';
import { Filter } from '../../models/forum/Filter';


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


  getPostsWithTopicId(topic_id: string, filter: Filter): Observable<{
    data: Post[], totalPosts: number
  }> {
    const queryParams = new URLSearchParams();
    queryParams.append('page', filter.page.toString());
    if (filter.name) queryParams.append('name', filter.name);
    if (filter.time) queryParams.append('time', filter.time.toString());
    if (filter.author) queryParams.append('author', filter.author);
    if (filter.hashtag) queryParams.append('hashtags', JSON.stringify(filter.hashtag))
    console.log(JSON.stringify(filter.hashtag));
    if (filter.sortTime) queryParams.append('sortTime', filter.sortTime);
    return this.http.get<{
      data: Post[], totalPosts: number
    }>(`${environment.apiUrl}post/topic/${topic_id}?${queryParams.toString()}`, { withCredentials: true });
  }


}
