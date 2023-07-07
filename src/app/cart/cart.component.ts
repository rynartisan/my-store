import {Component, OnInit} from '@angular/core';
import {CartProduct} from "../model/cart.product";
import {CartService} from "../service/cart.service";
import {faShoppingCart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  orderProducts: CartProduct[] = [];
  customerInfo: CustomerInformation = {creditCardNumber: "", firstName: "", lastName: "", shippingAddress: ""};
  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faTrashCan = faTrashCan;

  constructor(private cartService: CartService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.initializeCartProducts();
    this.addDummyProduct();
  }

  submitForm(): void {
    // TODO: Implement method.
  }

  private addDummyProduct(): void {
    this.productService
      .getProducts()
      .subscribe(value => {
        if (this.orderProducts.length === 0) {
          this.cartService.addCartProduct({product: value[0], quantity: 2})
          this.cartService.addCartProduct({product: value[1], quantity: 2})
        }
      });
  }

  private initializeCartProducts(): void {
    this
      .cartService
      .getCartProducts()
      .subscribe(value => this.orderProducts = value);
  }
}

interface CustomerInformation {
  firstName: string,
  lastName: string,
  shippingAddress: string,
  creditCardNumber: string
}
