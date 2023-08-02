import {Order} from "./order.model";
import {CartStatus} from "./cart-status.model";


export interface CartState {
  cart: Cart;
  loading: boolean;
  error: string | null;
}

export interface Cart {
  id: number;
  orders: Order[];
  total: number;
  state: CartStatus;
}

