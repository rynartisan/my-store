import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = '/assets/data.json';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this
      .http
      .get<Product[]>(this.url);
  }
}
