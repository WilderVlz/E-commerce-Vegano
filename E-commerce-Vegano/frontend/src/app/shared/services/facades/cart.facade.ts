import {Injectable} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Order} from "../../../store/models/order.model";
import {CartActions} from "../../../store/actions/cart.actions";
import {selectCart} from "../../../store/selectors/cart.selectors";
import {Observable} from "rxjs";
import {CartState} from "../../../store/models/cart.model";
import {CartStatus} from "../../../store/models/cart-status.model";

@Injectable({
  providedIn: 'root'
})

export class CartFacade {

  constructor(private store: Store) {


  }

  public getCart(): Observable<CartState> {
    this.store.dispatch(CartActions.loadCart())
    return this.store.pipe(select(selectCart))
  }

  public addOrder(order: Order): void {

    this.store.dispatch(CartActions.addOrderToCart({order}));
    this.store.dispatch(CartActions.setState({state: CartStatus.ReadyToOrder}));
  }

  public updateOrder(order: Order): void {
    this.store.dispatch(CartActions.updateOrderToCart({order}))
  }


  public removeOrderToCart(order: Order): void {
    this.store.dispatch(CartActions.removeOrderFromCart({order}));
  }


}
