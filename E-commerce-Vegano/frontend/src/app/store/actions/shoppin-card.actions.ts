import {createAction, props} from "@ngrx/store";
import {ShoppingCart} from "@shared/interfaces/shopping-cart.interface";
import {Order} from "@shared/interfaces/order.interface";

/*Las acciones son los utilizados x los componentes/services para despachar un cambio al store*/
export const setShoppingCart = createAction(
  '[App] Set ShoppingCart',
  props<{ shoppingCart: ShoppingCart }>()
);
export const addOrderToCart = createAction(
  '[App] addOrderToCart',
  props<{ order: Order }>()
);

export const updateOrderToCart = createAction(
  '[App] updateOrderToCart',
  props<{ order: Order }>()
);

export const removeOrderToCart = createAction(
  '[App] removeOrderToCart',
  props<{ order: Order }>()
);
