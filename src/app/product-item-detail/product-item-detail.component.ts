import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../model/product";
import {ActivatedRoute} from "@angular/router";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() id!: number;
  product?: Product;
  buttonIcon: IconDefinition = faShoppingCart;
  buttonLabel: string = 'Add to cart';
  quantity: number = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private activatedRoute: ActivatedRoute) {
  }

  addToCart() {

  }

  onChangeSelection($event: any) {
    console.log($event)
  }

  ngOnInit(): void {
    this
      .activatedRoute
      .data
      .subscribe(({product}) => this.product = product);
  }
}
