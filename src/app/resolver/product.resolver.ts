import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

export const productResolver: ResolveFn<Product> = (
  route: ActivatedRouteSnapshot,
): Observable<Product> => {
  const id = route.paramMap.get('id')!;
  const productService = inject(ProductService);
  return productService.findProduct(parseInt(id));
};
