import {Component, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Cart} from 'src/app/store/models/cart.model';
import {selectCart} from 'src/app/store/selectors/cart.selectors';
import {CartStatus} from "../../../../store/models/cart-status.model";

@Component({
  selector: 'app-order-summary-container',
  templateUrl: './order-summary-container.component.html',
  styleUrls: ['./order-summary-container.component.scss']
})
export class OrderSummaryContainerComponent implements OnInit {
  private store = inject(Store);
  public envio: number = 2;
  public total: number = 0;
  shoppingCart: Cart = {
    id: 0,
    orders: [],
    total: 0,
    state: CartStatus.New
  }


  ngOnInit(): void {


    this.store.select(selectCart).subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart.cart;
      this.total = shoppingCart.cart.total + this.envio;
    });


  }

}
