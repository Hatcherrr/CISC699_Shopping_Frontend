import {Injectable, Provider} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  headers = new HttpHeaders({'Content-Type':  'application/json'});

  constructor(private http: HttpClient) { }

  getProvider(id: string): Observable<Provider> {
    return this.http.get<Provider>(`${environment.API_URL}/ds/providers/${id}`, {withCredentials: true});
  }
}
