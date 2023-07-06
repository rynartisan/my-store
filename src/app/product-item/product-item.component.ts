import {Component, Input} from '@angular/core';
import {Product} from "../model/product";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {CartService} from "../service/cart.service";
import {CartProduct} from "../model/cart.product";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = {description: "", id: 0, name: "", price: 0, url: ""};
  quantity: number = 1;
  protected readonly faShoppingCart = faShoppingCart;
   quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private cartService: CartService) {
  }

  addToCart(): void {
    // Create the CartProductObject.
    const cartProduct: CartProduct = {product: this.product, quantity: this.quantity};
    // Send the product to the service.
    this.cartService.addCartProduct(cartProduct);
    // Reset the quantity to original.
    this.quantity = 1;
  }
}
