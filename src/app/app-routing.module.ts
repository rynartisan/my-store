import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductItemComponent} from "./product-item/product-item.component";
import {CartComponent} from "./cart/cart.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {ProductListComponent} from "./product-list/product-list.component";

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'item-detail', component: ProductItemComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
