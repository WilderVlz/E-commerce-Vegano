import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CartFacade} from "@shared/services/facades/cart.facade";
import {Store} from "@ngrx/store";
import {catchError, exhaustMap, map, mergeMap, of, withLatestFrom} from "rxjs";
import {PedidoService} from "@shared/services/pedido.service";
import {UserActions} from "../actions/user.actions";
import {selectUser} from "../selectors/user.selectors";
import {CustomerService} from "@shared/services/customer.service";
import {UserService} from "@shared/services/user.service";
import {CartActions} from "../actions/cart.actions";

@Injectable({
  providedIn: "root"
})
export class UserEffects {

  constructor(
    private actions$: Actions,
    private cartFacade: CartFacade,
    private store: Store,
    private pedidoService: PedidoService,
    private customerService: CustomerService,
    private userService: UserService
  ) {
  }


  // noinspection TypeScriptValidateTypes
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap((action) =>
        this.userService.consultarUsuario(action.id).pipe(
          mergeMap((data) => [
            UserActions.loadCustomer({id: data.clienteId}),
            CartActions.loadCart(),
            UserActions.loadHistory(),
            UserActions.loadUserSuccess({user: data}),
          ]),
          catchError((error) => {
            console.error('Error al cargar usuario:', error);
            return of(UserActions.loadCustomerFailure({error: 'Error al cargar usuario'}));
          })
        )
      )
    )
  );


// noinspection TypeScriptValidateTypes
  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadCustomer),
      withLatestFrom(this.store.select(selectUser)),
      exhaustMap(([action, store]) =>
        this.customerService.consultarCliente(store.userId).pipe(
          map((data) => {
            return UserActions.loadCustomerSuccess({customer: data})
          }),
          catchError((error) => {
            console.error('Error al cargar cliente:', error);
            return of(UserActions.loadCustomerFailure({error: 'Error al cargar cliente'}));
          })
        )
      )
    )
  );
  // noinspection TypeScriptValidateTypes
  loadOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadHistory),
      withLatestFrom(this.store.select(selectUser)),
      exhaustMap(([action, store]) =>
        this.pedidoService.historialPedidos(store.userId).pipe(
          map((data) => {
            return UserActions.loadHistorySuccess({historial: data})
          }),
          catchError((error) => {
            console.error('Error al cargar las ordenes:', error);
            return of(UserActions.loadHistoryFailure({error: 'Error al cargar ordenes'}));
          })
        )
      )
    )
  );


}


