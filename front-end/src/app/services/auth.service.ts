import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subscription, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Store } from '@ngrx/store';
import { User } from '../models/User';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Delete, Update } from '../store/user/user.actions';
import { Router } from '@angular/router';
import { AppState } from '../store/reducer';

interface LoginResponse {
  user: User,
  token: string,
}

@Injectable({
  providedIn: 'root'
})





export class AuthService {

  constructor(private http: HttpClient, private store: Store<AppState>, private cookie: CookieService, private messageService: MessageService, private router: Router) {

  }




  isAuth(): Observable<boolean> {
    return this.store.select('user').pipe(
      switchMap(data => {
        if (!data._id) {
          if (this.cookie.get('token')) {
            return this.getUserInfor();
          }
          else {
            return of(false);
          }
        }
        else {
          return of(true);
        }
      })
    );
  }


  isLoginGuard(): Observable<boolean> {
    return this.store.pipe(map((data) => {
      if (data.user._id) {
        return true;
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Có lỗi xảy ra', detail: 'Vui lòng đăng nhập để thực hiện tính năng này' });
        return false;
      }
    }));
  }

  signup(userData: { username: string; password: string }): Observable<any> {
    // console.log(environment.apiUrl);
    return this.http.post(`${environment.apiUrl}auth/signup`, userData);
  }

  login(userData: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}auth/login`, userData).pipe(tap(data => {
      if (data.token) {
        this.cookie.set('token', data.token, 1, '/');
        this.store.dispatch(Update({ updateValue: data.user }));
      }
    }));
  }

  getUserInfor(): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}auth/userinfor`, { withCredentials: true }).pipe(map((data: any) => {
      if (data?.user) {
        this.store.dispatch(Update({ updateValue: data?.user }));
        return true;
      }
      else {
        return false;
      }
    }));
  }

  logOut() {
    return this.http.get(`${environment.apiUrl}auth/logout`, { withCredentials: true }).subscribe((data) => {
      this.store.dispatch(Delete());
      this.router.navigate(['/home']);
      this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Đăng xuất thành công' });
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Thật bại', detail: 'Đăng xuất thất bại, có lỗi xảy ra' });
    });
  }
}
