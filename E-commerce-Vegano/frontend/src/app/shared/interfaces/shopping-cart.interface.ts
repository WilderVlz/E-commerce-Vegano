import {Order} from "@shared/interfaces/order.interface";
import {ShoppingCartState} from "@shared/enums/shopping-cart-state.interface";

/*
export interface ShoppingCart {
  orders: Order[];
  //idPedido:id
  //detalle:order[]
  total: number;
  state: ShoppingCartState;
}
*/
export class ShoppingCart {
  //TODO: TERMINAR CLASS -> PARA USARLO MEJOR EN STORE
  orders: Order[];
  //idPedido:id
  //detalle:order[]
  total: number;
  state: ShoppingCartState;

  constructor() {
    this.orders = [];
    this.total = 0;
    this.state = ShoppingCartState.New;
  }

  public updateOrders(order: Order): ShoppingCart {
    this.orders = this.orders.filter(oneOrder => oneOrder !== order)
    this.orders.push(order)
    this.updateTotal()
    this.state = ShoppingCartState.ReadyToOrdered
    return this;
  }

  public removeOrders(order: Order): ShoppingCart {
    this.orders = this.orders.filter(oneOrder => oneOrder !== order)
    this.state = ShoppingCartState.ReadyToOrdered
    return this;
  }

  public updateTotal(): ShoppingCart {
    this.total = this.orders.reduce((acc, order) => acc + order.totalParcial, 0)
    return this;
  }


}
