import {createReducer, on} from '@ngrx/store';
import {CartActions} from "../actions/cart.actions";
import {
  handleAddOrderToCartSuccess,
  handleCartError,
  handleCartLoadedSuccess,
  handleChangeCartState,
  handleLoad,
  handleNewCart,
  handleRemoveOrderToCart,
  handleSetId
} from "./handlers/cart.handler";
import {CartStatus} from "../models/cart-status.model";
import {CartState} from "../models/cart.model";

export const initialState: CartState = {
  cart: {
    id: 0,
    orders: [],
    total: 0,
    state: CartStatus.New,
  },
  loading: false,
  error: null
};


export const cartReducer = createReducer(
  initialState,
  on(CartActions.loadCart, handleLoad),
  on(CartActions.setId, handleSetId),
  on(CartActions.newCart, handleNewCart),
  on(CartActions.cartLoadedSuccess, handleCartLoadedSuccess),
  on(CartActions.cartLoadedError, handleCartError),

  on(CartActions.addOrderToCart, handleLoad),
  on(CartActions.addOrderToCartSuccess, handleAddOrderToCartSuccess),
  on(CartActions.addOrderToCartFailure, handleCartError),

  on(CartActions.updateOrderToCart, handleAddOrderToCartSuccess),
  on(CartActions.removeOrderFromCart, handleRemoveOrderToCart),
  on(CartActions.setState, handleChangeCartState),
);


