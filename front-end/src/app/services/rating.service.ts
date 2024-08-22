import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RatingInterface } from '../models/Rating';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private _http: HttpClient) { }


  createRating(rating: RatingInterface): Observable<RatingInterface> {
    return this._http.post<RatingInterface>(`${environment.apiUrl}rating/${rating.course_id}`, rating, { withCredentials: true });
  }

  getRatingByCourseId(courseId: string): Observable<RatingInterface[]> {
    return this._http.get<RatingInterface[]>(`${environment.apiUrl}rating/${courseId}`, { withCredentials: true });
  }
}
