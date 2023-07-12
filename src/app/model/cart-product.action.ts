import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { CartProduct } from './cart.product';

export interface CartProductAction {
  action: IconDefinition;
  cartProduct: CartProduct;
}
