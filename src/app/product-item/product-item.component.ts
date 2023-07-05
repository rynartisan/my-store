import {Component, Input} from '@angular/core';
import {Product} from "../model/product";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product = {description: "", id: 0, name: "", price: 0, url: ""};
  quantity: number = 1;
  protected readonly faShoppingCart = faShoppingCart;
}
