import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from '../../model/cart.product';
import { CartService } from '../../service/cart.service';
import {
  faMinus,
  faPlus,
  faShoppingCart,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { Cart } from '../../model/cart';
import { ProductService } from '../../service/product.service';
import { CustomerInformation } from '../../model/customer-Information';
import { CustomerInformationService } from '../../service/customer-information.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartProductAction } from '../../model/cart-product.action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  customerInformationForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(32),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    shippingAddress: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(256),
    ]),
    creditCardNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('\\d{16}'),
    ]),
  });
  protected readonly faShoppingCart = faShoppingCart;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private customerInformationService: CustomerInformationService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.initializeCartProducts();
  }

  submitForm(): void {
    // Save the data to the service.
    this.customerInformationService.setCustomerInformation(
      <CustomerInformation>this.customerInformationForm.value,
    ); // Implicit casting.
    // Clear the cart.
    this.cartService.clearCart();
    // Display notification
    this.toastrService.success('Your order was completed!');
    // Navigate to the confirmation page.
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/checkout']);
  }

  removeCartProduct(cartProduct: CartProduct): void {
    this.cartService.removeCartProduct(cartProduct);
    this.toastrService.warning(`Product was deleted from your cart!`);
  }

  updateCartProductQuantity($event: CartProductAction): void {
    // Depending on the icon clicked, update the quantity.
    if ($event.action === faTrashCan)
      this.removeCartProduct($event.cartProduct);
    else if ($event.action === faPlus) $event.cartProduct.quantity++;
    else if ($event.action === faMinus) $event.cartProduct.quantity--;

    // Execute the update.
    if ($event.cartProduct.quantity === 0)
      this.removeCartProduct($event.cartProduct);
    else this.cartService.updateCartProduct($event.cartProduct);
  }

  private initializeCartProducts(): void {
    this.cartService.getCart().subscribe((value) => (this.cart = value));
  }
}
