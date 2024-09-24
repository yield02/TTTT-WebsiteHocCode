import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Topic } from '../../models/forum/Topic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private _http: HttpClient) {

  }

  getAllTopic(): Observable<Topic[]> {
    return this._http.get<Topic[]>(`${environment.apiUrl}topic`);
  }

}
