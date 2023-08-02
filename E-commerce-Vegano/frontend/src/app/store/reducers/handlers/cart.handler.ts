import {Order} from "../../models/order.model";
import {CartStatus} from "../../models/cart-status.model";
import {CartState} from "../../models/cart.model";


const estadoPedidoIdToCartStateMap: CartStatus[] = [
  CartStatus.New,
  CartStatus.ReadyToOrder,
  CartStatus.ReadyToPay,
  CartStatus.PreparingOrder,
  CartStatus.Finished
]


export const handleLoad = (state: CartState): CartState => {
  return {
    ...state,
    loading: true
  }
}

export const handleSetId = (state: CartState, {id, status}: { id: number, status: number }): CartState => {
  return {
    ...state,
    cart: {
      ...state.cart,
      id,
      state: estadoPedidoIdToCartStateMap[status]
    }
  }
}

export const handleNewCart = (state: CartState): CartState => {
  return {
    ...state,
  }
}


export const handleCartLoadedSuccess = (state: CartState, {orders}: { orders: Order[] }): CartState => {
  const ordersVerify: Order[] = orders.map(value => {
      return {
        ...value,
        totalParcial: value.count * value.plate.precio
      }
    }
  )

  return {
    cart: {
      ...state.cart,
      total: calculateTotal(ordersVerify),
      orders: ordersVerify
    },
    loading: false,
    error: null
  };
}
export const handleCartError = (state: CartState, {error}: { error: string }): CartState => {
  return {
    ...state,
    loading: false,
    error
  };
}


export const handleAddOrderToCartSuccess = (state: CartState, {order}: { order: Order }): CartState => {
  const orders = [...state.cart.orders];
  const existingOrderIndex = orders.findIndex(oneOrder => oneOrder.plate === order.plate);

  if (existingOrderIndex !== -1) {
    orders[existingOrderIndex] = {
      ...order,
      count: order.count,
      totalParcial: order.count * order.plate.precio,
      id: orders[existingOrderIndex].id
    };
  } else {
    orders.push(order);
  }

  return {
    ...state,
    cart: {
      ...state.cart,
      orders: orders,
      total: calculateTotal(orders),
      state: CartStatus.ReadyToOrder
    }
  }
}


export const handleRemoveOrderToCart = (state: CartState, {order}: { order: Order }): CartState => {
  const ordersUpdated = [...state.cart.orders.filter(oneOrder => oneOrder.plate.platoId !== order.plate.platoId)];
  return {
    ...state,
    cart: {
      ...state.cart,
      orders: ordersUpdated,
      total: calculateTotal(ordersUpdated),
      state: ordersUpdated.length === 0 ? CartStatus.New : CartStatus.ReadyToOrder
    }
  }
};

export const handleChangeCartState = (state: CartState, {state: cartState}: { state: CartStatus }): CartState => {
  return {
    ...state,
    ...state,
    cart: {
      ...state.cart,
      state: cartState
    }

  }
}


function calculateTotal(orders: Order[]) {
  return orders.reduce((acc, order) => acc + order.totalParcial, 0);
}
