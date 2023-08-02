import {createReducer} from '@ngrx/store';
import {AppState} from "../models/app-state.model";

export const initialState: AppState = {
  loading: false,
  error: null
};

export const appReducer = createReducer(
  initialState,
);


