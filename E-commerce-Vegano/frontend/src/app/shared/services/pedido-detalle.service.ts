import {ApiBaseService} from "@shared/services/api-base.service";
import {map, Observable} from "rxjs";

import {Injectable} from "@angular/core";
import {Order} from "../../store/models/order.model";


@Injectable({
  providedIn: 'root'
})
export class PedidoDetalleService {


  constructor(private apiBase: ApiBaseService) {
  }

  public listarPedidoDetalle(): Observable<PedidoDetalleRequest[]> {
    return this.apiBase.get<PedidoDetalleRequest[]>('/VeggieDelivery/listaDePedidoDetalle');
  }


  public crearPedidoDetalle(body: PedidoDetalleRequest): Observable<PedidoDetalleRequest> {
    return this.apiBase.post<PedidoDetalleRequest>('/VeggieDelivery/crearPedidoDetalle', body);
  }

  public modificarPedidoDetalle(body: PedidoDetalleRequest): Observable<PedidoDetalleRequest> {
    return this.apiBase.put<PedidoDetalleRequest>('/VeggieDelivery/modificarPedidoDetalle', body);
  }

  public eliminarPedidoDetalle(id: number): Observable<PedidoDetalleRequest> {

    return this.apiBase.delete<PedidoDetalleRequest>(`/VeggieDelivery/eliminarPedidoDetalle/${id}`);
  }

  public consultarPedidosDetalleSegunPedido(id: number): Observable<Order[]> {

    return this.apiBase.get<Order[]>(`/VeggieDelivery/consultarPedidosDetalleSegunPedido/${id}`);
  }

  public filtrarPorPedidoId(pedidoId: number): Observable<PedidoDetalleRequest[]> {
    return this.listarPedidoDetalle().pipe(
      map(pedidos => pedidos.filter(pedido => pedido.pedidoId === pedidoId))
    );
  }
}

export interface PedidoDetalleRequest {
  pedidoDetalleId: number;
  pedidoId: number;
  platoId: number;
  cantidad: number;
  subTotal: number;
}
