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

  updateStatus(user_ids: string[], status: "allow" | "block", reason?: string, date: number = 7): Observable<any> {
    return this._http.patch<any>(`${environment.apiUrl}manager/user/updateStatus`, { user_ids, status, reason, date }, { withCredentials: true });
  }

  updateAdminRole(user_ids: string[], state: 'member' | 'admin') {
    return this._http.patch<any>(`${environment.apiUrl}manager/user/updateAdminRole`, { user_ids, state }, { withCredentials: true });
  }

  deleteUsers(user_ids: string[]): Observable<any> {
    return this._http.delete<any>(`${environment.apiUrl}manager/user/deletemany/${JSON.stringify(user_ids)}`, { withCredentials: true });
  }

}
