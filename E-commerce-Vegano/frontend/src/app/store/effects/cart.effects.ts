import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CartFacade} from "@shared/services/facades/cart.facade";
import {select, Store} from "@ngrx/store";
import {PedidoDetalleRequest, PedidoDetalleService} from "@shared/services/pedido-detalle.service";
import {catchError, EMPTY, filter, map, of, switchMap, withLatestFrom} from "rxjs";
import {PedidoRequest, PedidoService} from "@shared/services/pedido.service";
import {CartActions} from "../actions/cart.actions";
import {selectCart} from "../selectors/cart.selectors";
import {CartStatus, estadoPedidoIdToCartStateMap} from "../models/cart-status.model";
import {Order} from "../models/order.model";
import {selectUser} from "../selectors/user.selectors";
import {CartLocalStorageService} from "@shared/services/localStorage/cart-local-storage.service";
import {Cart} from "../models/cart.model";

@Injectable({
  providedIn: "root"
})
export class CartEffects {


  constructor(
    private actions$: Actions,
    private cartFacade: CartFacade,
    private store: Store,
    private pedidoService: PedidoService,
    private pedidoDetalleService: PedidoDetalleService,
    private cartLocalStorageService: CartLocalStorageService
  ) {
  }

  private getLastPedidoRequestFromData(data: PedidoRequest[]) {
    const id = data.reduce((max, elemento) => (elemento.pedidoId > max ? elemento.pedidoId : max), 0)
    return data.filter(data => data.pedidoId === id)[0]
  }

  private pedidoRequestIsFinished(pedido: PedidoRequest) {
    return estadoPedidoIdToCartStateMap[pedido.estadoPedidoId] === CartStatus.Finished
  }


  // noinspection TypeScriptValidateTypes
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([_, store]) => {
        if (store.userId > 0) {
          console.log("Cargo desde el backend")
          return this.loadCartFromService(store.userId);
        } else {
          console.log("Cargo desde local storage")
          return this.loadCartFromLocalStorage();
        }
      })
    )
  );


  private loadCartFromService(userId: number) {
    return this.pedidoService.listarPedidosDeUsuario(userId).pipe(
      map((data) => this.handleLoadCartService(data)),
      catchError((error) => {
        console.error('Error al cargar el carrito:', error);
        return of(CartActions.cartLoadedError({error: 'Error al cargar carrito'}));
      })
    );
  }

  private loadCartFromLocalStorage() {
    const cartLocalStorage: Cart = this.cartLocalStorageService.getCart();
    if (cartLocalStorage) {
      return of(CartActions.cartLoadedSuccess({orders: cartLocalStorage.orders}));
    } else {
      return of(CartActions.newCart());
    }
  }

  private handleLoadCartService(data: PedidoRequest[]) {

    if (data.length > 0) {
      const lastOrder = this.getLastPedidoRequestFromData(data);
      if (!this.pedidoRequestIsFinished(lastOrder)) {
        const id = lastOrder.pedidoId;
        const status = estadoPedidoIdToCartStateMap[lastOrder.estadoPedidoId];

        this.cartLocalStorageService.newCart(id, status)
        return CartActions.setId({id: id, status: lastOrder.estadoPedidoId});
      }
    }
    return CartActions.newCart();
  }


  // noinspection TypeScriptValidateTypes
  newCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.newCart),
      withLatestFrom(this.store.select(selectUser)),
      switchMap(([_, store]) => {
        if (store.userId > 0) {
          return this.newOrderToService(store.userId);
        } else {
          return this.newCartToLocalStorage();
        }
      })
    )
  );

  private newOrderToService(userId: number) {
    return this.pedidoService.crearPedido(this.newCartRequest(userId)).pipe(
      map((response) => this.handleNewCartService(response.pedidoId),
        catchError((error) => {
          console.error('Error en la petición:', error);
          return of(CartActions.cartLoadedError({error: 'Error al cargar orden al carrito'}));
        })
      ))
  }

  private newCartRequest(idUsuario: number): PedidoRequest {
    return {
      pedidoId: 0,
      pagoId: 0,
      direccionId: 0,
      usuarioId: idUsuario,
      fechaPedido: new Date(),
      fechaEntrega: new Date(),
      fechaEntregaEstimada: new Date(),
      estadoPedidoId: 0
    }
  }

  private newCartToLocalStorage() {
    this.cartLocalStorageService.newCart();
    return of(CartActions.setId({id: 0, status: 0}));
  }

  private handleNewCartService(pedidoId: number) {
    this.cartLocalStorageService.newCart(pedidoId);
    return CartActions.setId({id: pedidoId, status: 0})
  }


  // noinspection TypeScriptValidateTypes
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.setId),
      withLatestFrom(this.store.select(selectCart)),
      switchMap(([_, store]) => {
        if (store.cart.id > 0) {//Si no es una orden
          return this.loadOrdersFromService(store.cart.id);
        } else {
          return this.loadCartFromLocalStorage();
        }
      })
    )
  );

  private loadOrdersFromService(orderId: number) {
    return this.pedidoDetalleService.consultarPedidosDetalleSegunPedido(orderId).pipe(
      map((data) => CartActions.cartLoadedSuccess({orders: data}),
        catchError((error) => {
          console.error('Error al cargar el carrito:', error);
          return of(CartActions.cartLoadedError({error: 'Error al cargar carrito'}));
        })
      ));
  }


  private toPedidoDetalleRequest(order: Order): PedidoDetalleRequest {
    const pedidoDetalleId = order.id ?? -1;
    const platoId = order.plate.platoId ?? -1;
    let pedidoId = 0

    this.store.pipe(select(selectCart)).subscribe(state => {
      pedidoId = state.cart.id
    });

    return {
      pedidoDetalleId: pedidoDetalleId,
      pedidoId: pedidoId,
      platoId: platoId,
      cantidad: order.count,
      subTotal: order.totalParcial,
    };
  }

  // noinspection TypeScriptValidateTypes
  addOrderToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addOrderToCart),
      withLatestFrom(this.store.select(selectCart)),
      filter(([action, store]) => !this.orderExistsInCart(action.order, store.cart.orders)),
      switchMap(([action, store]) => {
        if (store.cart.id > 0) {
          return this.addOrderToService(action.order);
        } else {
          return this.addOrderToLocalStorage(action.order);
        }
      })
    )
  );

  private addOrderToService(order: Order) {
    return this.pedidoDetalleService.crearPedidoDetalle(this.toPedidoDetalleRequest(order)).pipe(
      map((response) => this.handleAddOrderCartService(order, response.pedidoDetalleId)),
      catchError((error) => {
        console.error('Error en la petición:', error);
        return of(CartActions.addOrderToCartFailure({error: 'Error al cargar orden al carrito'}));
      })
    );
  }

  private addOrderToLocalStorage(order: Order) {
    this.cartLocalStorageService.addOrder(order)
    return of(CartActions.addOrderToCartSuccess({order: order}));
  }

  private handleAddOrderCartService(order: Order, pedidoDetalleId: number) {
    const orderWithId: Order = {...order, id: pedidoDetalleId};
    this.cartLocalStorageService.addOrder(orderWithId)
    return CartActions.addOrderToCartSuccess({order: orderWithId});
  }

  // noinspection TypeScriptValidateTypes
  updateOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateOrderToCart),
      withLatestFrom(this.store.select(selectCart)),
      switchMap(([action, store]) => {
        if (store.cart.id > 0) {
          return this.updateOrderToService(action.order);
        } else {
          return this.updateOrderToLocalStorage(action.order);
        }
      })
    )
  );

  private updateOrderToService(order: Order) {
    return this.pedidoDetalleService.modificarPedidoDetalle(this.toPedidoDetalleRequest(order)).pipe(
      map((response) => this.handleUpdateOrderCartService(order, response.pedidoDetalleId)),
      catchError((error) => {
        console.error('Error en la petición:', error);
        return of(CartActions.addOrderToCartFailure({error: 'Error al actualizar orden al carrito'}));
      })
    );
  }

  private updateOrderToLocalStorage(order: Order) {
    this.cartLocalStorageService.addOrder(order)
    return of(CartActions.addOrderToCart({order: order}));
  }

  private handleUpdateOrderCartService(order: Order, pedidoDetalleId: number) {
    const orderWithId: Order = {...order, id: pedidoDetalleId};
    this.cartLocalStorageService.addOrder(orderWithId)
    return CartActions.addOrderToCart({order: orderWithId});
  }


  // noinspection TypeScriptValidateTypes
  removeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeOrderFromCart),
      withLatestFrom(this.store.select(selectCart)),
      switchMap(([action, store]) => {
        if (store.cart.id > 0) {
          return this.removeOrderFromService(action.order);
        } else {
          this.removeOrderFromLocalStorage(action.order); // Ejecutar la función directamente
          return EMPTY; // Retorna EMPTY ya que no se necesita una acción de éxito o error
        }
      })
    )
  );

  private removeOrderFromService(order: Order) {
    return this.pedidoDetalleService.eliminarPedidoDetalle(order.id).pipe(
      switchMap((_) => {
        this.removeOrderFromLocalStorage(order); // Ejecutar la función directamente
        return EMPTY; // Retorna EMPTY ya que no se necesita una acción de éxito o error
      }),
      catchError((error) => {
        console.error('Error en la petición:', error);
        return of(CartActions.addOrderToCartFailure({error: 'Error al eliminar orden del carrito'}));
      })
    );
  }

  private removeOrderFromLocalStorage(order: Order) {
    this.cartLocalStorageService.removerOrder(order)
    return CartActions.removeOrderFromCart({order: order});
  }


  orderExistsInCart(order: Order, cartOrders: Order[]): boolean {
    return cartOrders.some(cartOrder => cartOrder.plate.platoId === order.plate.platoId);
  }
}


