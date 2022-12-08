import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  headers = new HttpHeaders({'Content-Type':  'application/json'});

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.API_URL}/users`, {withCredentials: true});
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/users/${id}`, {withCredentials: true});
  }

  deleteUser(id: number): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${environment.API_URL}/users/${id}`, {withCredentials: true});
  }

  updateUser(user): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/users`, user, {withCredentials: true, headers: this.headers});
  }

  addUser(user): Observable<{success: boolean}> {
    console.log(user);
    return this.http.post<{success: boolean}>(`${environment.API_URL}/users`, user, {withCredentials: true, headers: this.headers});
  }

  getPdf(id: number) {
    return this.http.get(`${environment.API_URL}/users/${id}/pdf`, {responseType: 'blob'});
  }
}
