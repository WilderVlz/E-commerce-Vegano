import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Order} from "../models/order.model";
import {CartStatus} from "../models/cart-status.model";


export const CartActions = createActionGroup({
  source: 'Cart',
  events: {
    'Load Cart': emptyProps(),
    'Set Id': props<{ id: number, status: number }>(),
    'New Cart': emptyProps(),
    'Cart Loaded Success': props<{ orders: Order[] }>(),
    'Cart Loaded Error': props<{ error: string }>(),
    'Add Order To Cart': props<{ order: Order }>(),
    'Add Order To Cart Success': props<{ order: Order }>(),
    'Add Order To Cart Failure': props<{ error: string }>(),
    'Update Order To Cart': props<{ order: Order }>(),
    'Remove Order From Cart': props<{ order: Order }>(),
    'Set State': props<{ state: CartStatus }>(),
  },
});

