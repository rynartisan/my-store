import {Component, OnInit} from '@angular/core';
import {CartProduct} from "../model/cart.product";
import {CartService} from "../service/cart.service";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderProducts: CartProduct[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.initializeCartProducts();
  }

  private initializeCartProducts() {
    this
      .cartService
      .getCartProducts()
      .subscribe(value => this.orderProducts = value);
  }

  protected readonly faShoppingCart = faShoppingCart;
}
