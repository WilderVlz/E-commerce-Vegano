import {createReducer, on} from "@ngrx/store";
import {UserState} from "../models/user.model";
import {UserActions} from "../actions/user.actions";
import {
  handleCustomerLoadedSuccess,
  handleHistoryLoadedSuccess,
  handleLoad,
  handleLoadedError,
  handleUserLoadedSuccess
} from "./handlers/user.handler";

export const initialState: UserState = {
  user: {
    userId: -1,
    token: '',
    username: ''
  },
  customer: {
    clienteId: -1,
    nombre: "",
    apellido: "",
    email: "",
    numeroCelular: ""
  },
  historial: [],
  ordersInProgress: [],
  loading: false,
  error: null
};


export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, handleLoad),
  on(UserActions.loadUserSuccess, handleUserLoadedSuccess),
  on(UserActions.loadUserFailure, handleLoadedError),

  on(UserActions.loadCustomer, store => store),
  on(UserActions.loadCustomerSuccess, handleCustomerLoadedSuccess),
  on(UserActions.loadCustomerFailure, handleLoadedError),


  on(UserActions.loadHistory, store => store),
  on(UserActions.loadHistorySuccess, handleHistoryLoadedSuccess),
  on(UserActions.loadHistoryFailure, handleLoadedError),
);
