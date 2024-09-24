import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Hashtag } from '../../models/forum/Hashtag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {

  constructor(private _http: HttpClient) {

  }

  getHashtags(): Observable<Hashtag[]> {
    return this._http.get<Hashtag[]>(`${environment.apiUrl}hashtag`);
  }

}
