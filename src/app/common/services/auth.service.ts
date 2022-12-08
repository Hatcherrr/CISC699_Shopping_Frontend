import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Account();

  headers = new HttpHeaders({'Content-Type':  'application/json'});

  constructor(private http: HttpClient) {
    localStorage.clear();
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  login(user): Observable<{success: boolean, account: any}> {
    const userParams: HttpParams = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    console.log(userParams);
    return this.http.post<{success: boolean, account: any}>(`${environment.API_URL}/login`, userParams, {withCredentials: true});
  }

  logout(): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>(`${environment.API_URL}/logout`, null, {withCredentials: true});
  }
}
