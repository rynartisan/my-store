import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ActivatedRoute} from "@angular/router";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {ProductService} from "../service/product.service";
import {shuffle} from "lodash"

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() id!: number;
  product: Product = {description: "", id: 0, name: "", price: 0, url: ""};
  buttonIcon: IconDefinition = faShoppingCart;
  buttonLabel: string = 'Add to cart';
  quantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private products: Product[] = [];

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  addToCart() {

  }

  onChangeSelection($event: any) {
    console.log($event)
  }

  ngOnInit(): void {
    this.initializeMainProduct();
    this
      .productService
      .getProducts()
      .subscribe(value => {
        this.products = value
      })
  }

  getRandomProducts(id: number): Product[] {
    return shuffle(this.products).filter(value => value.id !== id).slice(0, 4);
  }

  private initializeMainProduct() {
    console.log(`id -> ${this.id}`)
    this
      .activatedRoute
      .data
      .subscribe(({product}) => this.product = product);
  }
}
