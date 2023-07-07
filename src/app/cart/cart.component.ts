import {Component, OnInit} from '@angular/core';
import {CartProduct} from "../model/cart.product";
import {CartService} from "../service/cart.service";
import {faShoppingCart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Cart} from "../model/cart";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  customerInfo: CustomerInformation = {creditCardNumber: "", firstName: "", lastName: "", shippingAddress: ""};
  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faTrashCan = faTrashCan;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.initializeCartProducts();
  }

  submitForm(): void {
    // TODO: Implement method.
  }

  removeCartProduct(cartProduct: CartProduct) {
    this.cartService.removeCartProduct(cartProduct);
  }

  private initializeCartProducts(): void {
    this
      .cartService
      .getCart()
      .subscribe(value => this.cart = value);
  }
}

interface CustomerInformation {
  firstName: string,
  lastName: string,
  shippingAddress: string,
  creditCardNumber: string
}
