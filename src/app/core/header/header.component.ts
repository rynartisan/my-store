import {Component, OnInit} from '@angular/core';
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'My Store';
  cartProductCount: number = 0;

  protected readonly faShoppingCart = faShoppingCart;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.updateProductCount();
  }

  private updateProductCount(): void {
    this.cartService
      .getCartProducts()
      .subscribe(value => {
        if (value.length !== 0)
          this.cartProductCount = value
            .map(value1 => value1.quantity)
            .reduce((previousValue:number, currentValue:number) =>Math.abs(currentValue)  + Math.abs(previousValue));
      });
  }
}
