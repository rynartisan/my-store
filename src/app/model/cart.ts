import {CartProduct} from "./cart.product";

export class Cart {
  cartProducts: CartProduct[] = [];

  getProductCount(): number {
    if (this.isEmpty())
      return 0;
    return this
      .cartProducts
      .map(value1 => value1.quantity)
      .reduce((previousValue: number, currentValue: number) => Math.abs(currentValue) + Math.abs(previousValue));
  }

  getCartTotal(): number {
    if (this.isEmpty())
      return 0;
    return Number(this
      .cartProducts
      .map(value1 => value1.quantity * value1.product.price)
      .reduce((previousValue: number, currentValue: number) => Math.abs(currentValue) + Math.abs(previousValue))
      .toFixed(2));
  }

  isEmpty(): boolean {
    return this.cartProducts.length === 0;
  }
}
