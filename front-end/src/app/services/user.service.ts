import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


  getUsersFromUsersId(users_id: String[]) {
    return this._http.get<User[]>(`${environment.apiUrl}user/`, {
      params: { users: JSON.stringify(users_id) }
    });
  }
}
