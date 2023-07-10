import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import {
  faCheckCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { ProductService } from '../../service/product.service';
import { shuffle } from 'lodash';
import { CartService } from '../../service/cart.service';
import { CartProduct } from '../../model/cart.product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  @Input() id!: string;
  product: Product = { description: '', id: 0, name: '', price: 0, url: '' };
  buttonIcon: IconDefinition = faShoppingCart;
  buttonLabel: string = 'Add to cart';
  quantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  randomProducts: Product[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
  ) {}

  addToCart(): void {
    // Create the CartProductObject.
    const cartProduct: CartProduct = {
      product: this.product,
      quantity: this.quantity,
    };
    // Send the product to the service.
    this.cartService.addCartProduct(cartProduct);
    // Reset the quantity to original.
    this.quantity = 1;
    // Change the button label.
    this.buttonLabel = 'Added to Cart!';
    // Change the icon
    this.buttonIcon = faCheckCircle;
  }

  onChangeSelection($event: any) {
    this.quantity = parseInt($event);
  }

  ngOnInit(): void {
    this.initializeMainProduct();
    this.initializeRandomProducts(parseInt(this.id));
    this.buttonLabel = 'Add to cart';
    this.buttonIcon = faShoppingCart;
  }

  private initializeRandomProducts(id: number) {
    this.productService.getProducts().subscribe((value) => {
      this.randomProducts = shuffle(value)
        .filter((value) => value.id !== id) // Remove the current element.
        .slice(0, 4); // Take only the first four.
    });
  }

  private initializeMainProduct() {
    this.activatedRoute.data.subscribe(
      ({ product }) => (this.product = product),
    );
  }
}
