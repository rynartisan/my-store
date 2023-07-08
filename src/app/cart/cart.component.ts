import {Component, OnInit} from '@angular/core';
import {CartProduct} from "../model/cart.product";
import {CartService} from "../service/cart.service";
import {faMinus, faPlus, faShoppingCart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Cart} from "../model/cart";
import {ProductService} from "../service/product.service";

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
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;

  constructor(private cartService: CartService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.initializeCartProducts();
    this.addDummyProduct();
  }

  private addDummyProduct() {
    this
      .productService
      .getProducts()
      .subscribe(value => {
        this.cartService.addCartProduct({product: value[0], quantity: 2});
      });
  }

  submitForm(): void {
    // TODO: Implement method.
  }

  removeCartProduct(cartProduct: CartProduct) :void{
    this.cartService.removeCartProduct(cartProduct);
  }

  updateQuantity(cartProduct: CartProduct, quantity: number):void {
    cartProduct.quantity += quantity;
    if (cartProduct.quantity === 0)
      this.cartService.removeCartProduct(cartProduct);
    else
      this.cartService.updateCartProduct(cartProduct);
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
