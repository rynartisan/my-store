import {Component, Input} from '@angular/core';
import {Product} from "../model/product";
import {faCheckCircle, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {CartService} from "../service/cart.service";
import {CartProduct} from "../model/cart.product";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = {description: "", id: 0, name: "", price: 0, url: ""};
  quantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  buttonLabel: string = 'Add to Cart';
  buttonIcon: IconDefinition = faShoppingCart;

  constructor(private cartService: CartService) {
  }

  addToCart(): void {
    // Create the CartProductObject.
    const cartProduct: CartProduct = {product: this.product, quantity: this.quantity};
    // Send the product to the service.
    this.cartService.addCartProduct(cartProduct);
    // Reset the quantity to original.
    this.quantity = 1;
    // Change the button label.
    this.buttonLabel = 'Added to Cart!';
    // Change the icon
    this.buttonIcon = faCheckCircle;
  }

  /**
   * I had to add this since for some reason NgModel treats input fields as string by default and concatenates numbers instead of adding them.
   * More on the problem: https://stackoverflow.com/questions/37921596/option-tag-returning-string-value-instead-of-number-for-ngmodel-in-angular
   * @param $event
   */
  onChangeSelection($event: any): void {
    this.quantity = parseInt($event);
  }
}
