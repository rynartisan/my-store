import {NgModule} from '@angular/core';
import {provideRouter, RouterModule, Routes, withComponentInputBinding} from '@angular/router';
import {CartComponent} from "./component/cart/cart.component";
import {ConfirmationComponent} from "./component/confirmation/confirmation.component";
import {ProductListComponent} from "./component/product-list/product-list.component";
import {ProductItemDetailComponent} from "./component/product-item-detail/product-item-detail.component";
import {productResolver} from "./resolver/product.resolver";

const routes: Routes = [
  {path: '', component: ProductListComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: ConfirmationComponent},
  {
    path: 'item/:id', component: ProductItemDetailComponent
    , resolve: {product: productResolver}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class AppRoutingModule {
}
