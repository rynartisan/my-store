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
    // Push new value.
    cartProducts.push(cartProduct);
    // Publish to subscribers.
    this.behaviorSubject
      .next(cartProducts);
  }
}
