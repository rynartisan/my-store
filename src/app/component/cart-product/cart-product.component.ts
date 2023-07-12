import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { CartProduct } from '../../model/cart.product';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { CartProductAction } from '../../model/cart-product.action';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})
export class CartProductComponent {
  @Input() cartProduct: CartProduct = {
    product: { id: 0, name: '', price: 0, description: '', url: '' },
    quantity: 0,
  };
  @Output() CartProductUpdated: EventEmitter<CartProductAction> =
    new EventEmitter<CartProductAction>();
  protected readonly faTrashCan: IconDefinition = faTrashCan;
  protected readonly faMinus: IconDefinition = faMinus;
  protected readonly faPlus: IconDefinition = faPlus;

  updateCartProduct(
    cartProduct: CartProduct,
    iconDefinition: IconDefinition,
  ): void {
    this.CartProductUpdated.emit({
      cartProduct: cartProduct,
      action: iconDefinition,
    });
  }
}
