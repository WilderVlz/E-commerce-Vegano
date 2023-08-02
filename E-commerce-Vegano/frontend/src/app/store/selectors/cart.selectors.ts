import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CartState} from "../models/cart.model";

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => state
);
