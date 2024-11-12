import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.apiUrl}manager/user`, { withCredentials: true });
  }



}
