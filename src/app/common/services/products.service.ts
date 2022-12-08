import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../models/product';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  headers = new HttpHeaders({'Content-Type':  'application/json'});

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.API_URL}/ds/products`, {withCredentials: true})
      /*.pipe(
        map(prods => {
          return prods.map(prod => {
            prod.createdon = new Date(prod.createdon);
            prod.lastupdate = new Date(prod.lastupdate);
            return prod;
          });
        })
      )*/;
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/ds/products/${id}`);
  }

  deleteProduct(id: string): Observable<{success: boolean}> {
    return this.http.delete<{success: boolean}>(`${environment.API_URL}/ds/products/${id}`, {withCredentials: true});
  }

  updateProduct(id: string, product: Product): Observable<{success: boolean}> {
    return this.http.put<{success: boolean}>(`${environment.API_URL}/ds/products/${id}`, product, {withCredentials: true, headers: this.headers});
  }

  addProduct(product): Observable<Product> {
    console.log(product);
    return this.http.post<Product>(`${environment.API_URL}/ds/products`, product, {withCredentials: true, headers: this.headers});
  }

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
}
