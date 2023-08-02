import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContainerRoutingModule} from './container-routing.module';
import {LayoutContainerComponent} from './layout/layout-container/layout-container.component';
import {HomeComponent} from './pages/home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthModule} from '@modules/auth/auth.module';
import {ShoppingCartComponent} from './pages/shopping-cart/shopping-cart.component';
import {FooterMobileComponent} from './components/footer-mobile/footer-mobile.component';
import {PaymentMethodComponent} from './pages/payment-method/payment-method.component';
import {CardPlateMenuComponent} from '@modules/container/components/card-plate/card-plate.menu.component';
import {DeckMenuComponent} from '@modules/container/components/deck-menu/deck-menu.component';
import {MenuComponent} from '@modules/container/pages/menu/menu.component';
import {ButtonFilterMenuComponent} from '@modules/container/components/button-filter-menu/button-filter-menu.component';
import {
  GroupButtonFilterMenuComponent
} from '@modules/container/components/group-button-filter-menu/group-button-filter-menu.component';
import {InputSearchMenuComponent} from '@modules/container/components/input-search-menu/input-search-menu.component';
import {
  DescripcionProductoComponent
} from '@modules/container/pages/descripcion-producto/descripcion-producto.component';
import {ButtonCounterComponent} from '@modules/container/components/button-counter/button-counter.component';
import {
  ButtonCounterProductOptionalComponent
} from '@modules/container/components/button-counter-product-optional/button-counter-product-optional.component';
import {ProductOptionalComponent} from '@modules/container/components/product-optional/product-optional.component';
import {
  CardModalPlateDetailsComponent
} from '@modules/container/components/card-modal-plate-details/card-modal-plate-details.component';
import {BadgeComponent} from "@modules/container/components/badge/badge.component";
import {StarRatingComponent} from "@modules/container/components/start-rating/star-rating.component";
import {TabsComponent} from "@modules/container/components/tabs/tabs.component";
import {ConfirmOrderComponent} from "@modules/container/pages/confirm-order/confirm-order.component";
import {NgbAlert, NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {StoreModule} from "@ngrx/store";
import {SharedModule} from "@shared/shared.module";

import {
  DeliveryContainerComponent
} from "@modules/container/components/delivery-container/delivery-container.component";
import {CardOrderComponent} from "@modules/container/components/card-order/card-order.component";
import {
  ButtonModalOrderDetailsComponent
} from "@modules/container/components/button-modal-order-details/button-modal-order-details.component";
import {menuReducer} from "@modules/container/store/reducers/menu.reducer";
import {OrderSummaryContainerComponent} from './components/order-summary-container/order-summary-container.component';
import {
  ProductSelectedContainerComponent
} from './components/product-selected-container/product-selected-container.component';
import {NgxStripeModule} from 'ngx-stripe';
import {
  DeckPurchaseOrderComponent
} from "@modules/container/components/deck-purchase-order/deck-purchase-order.component";
import {
  CardPurchaseOrderComponent
} from "@modules/container/components/card-purchase-order/card-purchase-order.component";


@NgModule({
  declarations: [
    LayoutContainerComponent,
    HomeComponent,
    ShoppingCartComponent,
    FooterMobileComponent,
    PaymentMethodComponent,
    //LoginModalComponent
    CardPlateMenuComponent,
    DeckMenuComponent,
    MenuComponent,
    ButtonFilterMenuComponent,
    GroupButtonFilterMenuComponent,
    InputSearchMenuComponent,
    DescripcionProductoComponent,
    ButtonCounterComponent,
    ButtonCounterProductOptionalComponent,
    ProductOptionalComponent,
    BadgeComponent,
    StarRatingComponent,
    CardModalPlateDetailsComponent,
    TabsComponent,
    ConfirmOrderComponent,
    StarRatingComponent,
    CardModalPlateDetailsComponent,
    DeliveryContainerComponent,
    CardOrderComponent,
    ButtonModalOrderDetailsComponent,
    DeliveryContainerComponent,
    OrderSummaryContainerComponent,
    ProductSelectedContainerComponent,
    DeckPurchaseOrderComponent,
    CardPurchaseOrderComponent,

    DeckPurchaseOrderComponent,
    CardPurchaseOrderComponent,

  ],
  imports: [
    CommonModule,
    ContainerRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    NgbCarouselModule,
    StoreModule.forFeature('menu', menuReducer),

    NgbCarouselModule,
    SharedModule,
    NgxStripeModule.forRoot('pk_test_51NXSCVGOZk6s2DM2ZIs3a7LDjStAPHKpQwsRWvyvzR6uLaSs8Vzm3CyBxghm5ORZqO6HuGq6eGMlTkzxmNScCkvi00vJuexg0O'),
    NgbAlert,

  ]
})
export class ContainerModule {
}
