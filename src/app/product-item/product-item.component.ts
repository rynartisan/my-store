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
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  protected readonly faShoppingCart = faShoppingCart;
  protected readonly parseInt = parseInt;

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

  // I had to add this since for some reason NgModel treats input fields as string by default and concatenates numbers instead of adding them.
  // More on the problem: https://stackoverflow.com/questions/37921596/option-tag-returning-string-value-instead-of-number-for-ngmodel-in-angular
  onChangeSelection($event: any) {
    this.quantity = parseInt($event);
  }
}
