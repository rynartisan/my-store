import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CartProduct} from "../model/cart.product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private behaviorSubject: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);
  private currentCartProducts: Observable<CartProduct[]> = this.behaviorSubject.asObservable();

  constructor() {
  }

  getCartProducts(): Observable<CartProduct[]> {
    return this.currentCartProducts;
  }

  addCartProduct(cartProduct: CartProduct): void {
    // Get current values.
    const cartProducts: CartProduct[] = this.behaviorSubject
      .getValue();
    //Find if the product is already added, if so just update the quantity.
    if (cartProducts.some(value => {
      return value.product === cartProduct.product
    })) {
      // Update the quantity
      const existingProduct: CartProduct = cartProducts.find(value => {
        return value.product === cartProduct.product
      }) as CartProduct;
      existingProduct.quantity += cartProduct.quantity;
      cartProducts[cartProducts.indexOf(existingProduct)] = existingProduct;
    } else {
      // Push new value.
      cartProducts.push(cartProduct);
    }

    // Publish to subscribers.
    this.behaviorSubject
      .next(cartProducts);
  }
}
