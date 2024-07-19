import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from '../models/Subject';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<{ subjects: Subject[] }> {
    return this.http.get<{ subjects: Subject[] }>(`${environment.apiUrl}subject`);
  }

}
