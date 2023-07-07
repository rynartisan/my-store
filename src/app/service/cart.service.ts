import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CartProduct} from "../model/cart.product";
import {Cart} from "../model/cart";
import {isEqual} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private behaviorSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(new Cart());
  private cart: Observable<Cart> = this.behaviorSubject.asObservable();

  constructor() {
  }

  getCart(): Observable<Cart> {
    return this.cart;
  }

  addCartProduct(cartProduct: CartProduct): void {
    // Get current values.
    const cart: Cart = this.behaviorSubject
      .getValue();
    const cartProducts = cart
      .cartProducts;
    //Find if the product is already added, if so just update the quantity.
    if (this.itemExistsInCart(cartProduct)) {
      // Update the quantity
      const existingProduct: CartProduct = cartProducts.find(value => {
        return isEqual(value.product, cartProduct.product);
      }) as CartProduct;
      existingProduct.quantity += cartProduct.quantity;
      this.updateCartProduct(existingProduct);
    } else {
      // Push new value.
      cartProducts.push(cartProduct);
      cart.cartProducts = cartProducts;
      // Publish to subscribers.
      this.behaviorSubject
        .next(cart);
    }
  }

  updateCartProduct(cartProduct: CartProduct): void {
    const cart: Cart = this.behaviorSubject
      .getValue();
    const cartProducts: CartProduct[] = cart.cartProducts;
    // Replace.
    cartProducts[cartProducts.indexOf(cartProduct)] = cartProduct;
    cart.cartProducts = cartProducts;
    // Publish to subscribers.
    this.behaviorSubject
      .next(cart);
  }

  itemExistsInCart(cartProduct: CartProduct): boolean {
    const cart: Cart = this.behaviorSubject
      .getValue();
    const cartProducts: CartProduct[] = cart.cartProducts;
    return cartProducts.some(value => {
      return isEqual(value.product, cartProduct.product);
    });
  }

  removeCartProduct(cartProduct: CartProduct): void {
    const cart: Cart = this.behaviorSubject
      .getValue();
    const cartProducts: CartProduct[] = cart.cartProducts;
    if (this.itemExistsInCart(cartProduct)) {
      cartProducts
        .splice(cartProducts.indexOf(cartProduct), 1);
      cart.cartProducts = cartProducts;
      // Publish to subscribers.
      this.behaviorSubject
        .next(cart);
    }
  }
}
