import {Injectable} from "@angular/core";
import {Cart} from "../../../store/models/cart.model";
import {LocalStorageService} from "@shared/services/localStorage/local-storage.service";
import {CartStatus} from "../../../store/models/cart-status.model";
import {Order} from "../../../store/models/order.model";

@Injectable({
  providedIn: 'root'
})
export class CartLocalStorageService {

  constructor(private localStorageService: LocalStorageService) {

  }


  // Método para guardar datos en el localStorage

  newCart(id: number = 0, state: CartStatus = CartStatus.New, order: Order[] = []): void {
    const newCart: Cart = {
      id: id,
      state: state,
      orders: order,
      total: order.reduce((pv, o) =>
        pv + o.totalParcial * o.count, 0)
    }
    this.removeCart()
    this.localStorageService.setItem("cart", newCart)
  }


  addOrder(order: Order) {
    const cart: Cart = this.getCart()

    const ordersList: Order[] = cart.orders;
    // Buscar si el pedido ya existe en la lista
    if (order.count === 0) {
      this.removerOrder(order)
    } else {
      const existingOrder = ordersList.find((o) => o.plate.platoId === order.plate.platoId);

      if (existingOrder) {
        // Si el pedido ya existe, actualizamos la propiedad count
        existingOrder.count = order.count;
      } else {
        // Si el pedido no existe, lo agregamos a la lista
        ordersList.push(order);
      }
    }


    this.newCart(cart.id, cart.state, ordersList)

  }

// Función para remover un pedido del carrito
  removerOrder(order: Order) {
    const cart: Cart = this.getCart()

    const ordersList: Order[] = cart.orders;
    // Filtrar la lista para eliminar el pedido con el ID proporcionado
    const updatedOrdersList = ordersList.filter((o) => o.id !== order.id);


    this.newCart(cart.id, cart.state, updatedOrdersList)
  }

  // Método para obtener datos del localStorage
  getCart(): Cart {
    return this.localStorageService.getItem("cart") as Cart
  }

  // Método para eliminar un dato del localStorage
  removeCart(): void {
    localStorage.removeItem("cart");
  }
}
