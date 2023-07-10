import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = '/assets/data.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  //TODO: handle error.
  findProduct(id: number): Observable<Product> {
    return this.getProducts().pipe(
      map((products) => products.find((product) => product.id === id)!),
    );
  }
}
