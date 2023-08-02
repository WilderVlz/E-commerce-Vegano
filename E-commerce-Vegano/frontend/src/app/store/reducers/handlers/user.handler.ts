import {UserState} from "../../models/user.model";
import {Customer} from "@shared/services/customer.service";
import {UserAPI} from "@shared/services/user.service";
import {HistorialRequest} from "@shared/services/pedido.service";
import {CartStatus, estadoPedidoIdToCartStateMap} from "../../models/cart-status.model";


export const handleLoad = (state: UserState, {id}: { id: number }): UserState => {
  return {
    ...state,
    user: {
      ...state.user,
      userId: id
    },
    loading: true
  }
}


export const handleCustomerLoadedSuccess = (state: UserState, {customer}: { customer: Customer }): UserState => {
  console.log("handle customer", customer)
  return {
    ...state,
    customer: customer,
    loading: false
  };
}


export const handleUserLoadedSuccess = (state: UserState, {user}: { user: UserAPI }): UserState => {
  return {
    ...state,
    user: {
      userId: user.usuarioId,
      token: "",
      username: user.usuario
    },
    loading: false
  };
}

export const handleHistoryLoadedSuccess = (state: UserState, {historial}: { historial: HistorialRequest[] }): UserState => {
  const finished = historial.filter(value => estadoPedidoIdToCartStateMap[value.estadoPedidoId] === CartStatus.Finished)
  const inProgress = historial.filter(value => estadoPedidoIdToCartStateMap[value.estadoPedidoId] === CartStatus.ReadyToOrder)
  return {
    ...state,
    historial: finished,
    ordersInProgress: inProgress,

    loading: false
  };
}

export const handleLoadedError = (state: UserState, {error}: { error: string }): UserState => {
  return {
    ...state,
    loading: false,
    error
  };
}
