import {ActivatedRouteSnapshot, ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {ProductService} from "../service/product.service";
import {Product} from "../model/product";

export const productResolver: ResolveFn<Product> =
  (route: ActivatedRouteSnapshot) => {
    const id = route.paramMap.get('id')!;
    const productService = inject(ProductService);
    return productService
      .findProduct(parseInt(id));
  };
