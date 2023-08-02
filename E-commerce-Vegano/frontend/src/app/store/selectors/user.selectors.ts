import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../models/user.model";

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);


export const selectCustomer = createSelector(
  selectUserState,
  (state: UserState) => state.customer
);

export const selectHistorial = createSelector(
  selectUserState,
  (state: UserState) => state.historial
);

export const selectOrdersInProgress = createSelector(
  selectUserState,
  (state: UserState) => state.ordersInProgress
);

export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
