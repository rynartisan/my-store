import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {CartProduct} from "../model/cart.product";
import {CartService} from "../service/cart.service";
import {faMinus, faPlus, faShoppingCart, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {Cart} from "../model/cart";
import {ProductService} from "../service/product.service";
import {CustomerInformation} from "./customer-Information";
import {CustomerInformationService} from "../service/customer-information.service";
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  customerInformationForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    shippingAddress: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]),
    creditCardNumber: new FormControl('', [Validators.required, Validators.pattern('\\d{16}')]),
  });
  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faTrashCan = faTrashCan;
  protected readonly faMinus = faMinus;
  protected readonly faPlus = faPlus;
  protected readonly JSON = JSON;

  constructor(private cartService: CartService, private productService: ProductService, private customerInformationService: CustomerInformationService, private router: Router) {
  }

  ngOnInit(): void {
    this.initializeCartProducts();
    this.addDummyProduct();
  }

  submitForm(): void {
    // Save the data to the service.
    this
      .customerInformationService
      .setCustomerInformation(<CustomerInformation>this.customerInformationForm.value); // Implicit casting.
    // Clear the cart.
    this
      .cartService
      .clearCart();
    // Navigate to the confirmation page.
    // noinspection JSIgnoredPromiseFromCall
    this
      .router
      .navigate(['/checkout']);
  }

  removeCartProduct(cartProduct: CartProduct): void {
    this.cartService.removeCartProduct(cartProduct);
  }

  updateQuantity(cartProduct: CartProduct, quantity: number): void {
    cartProduct.quantity += quantity;
    if (cartProduct.quantity === 0)
      this.cartService.removeCartProduct(cartProduct);
    else
      this.cartService.updateCartProduct(cartProduct);
  }

  anyFieldIsTouchedAndInvalid(): boolean {
    return Object.keys(this.customerInformationForm.controls).some(key => {
      const formControl = this.customerInformationForm.get(key);
      return formControl?.touched && formControl?.invalid;
    });
  }

  private addDummyProduct() {
    this
      .productService
      .getProducts()
      .subscribe(value => {
        this.cartService.addCartProduct({product: value[0], quantity: 2});
      });
  }

  private initializeCartProducts(): void {
    this
      .cartService
      .getCart()
      .subscribe(value => this.cart = value);
  }
}

