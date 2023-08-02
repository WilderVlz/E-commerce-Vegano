import {inject, Injectable} from '@angular/core';
import {ApiBaseService} from './api-base.service';
import {Observable} from 'rxjs';
import {Plate} from "@shared/interfaces/plate.interface";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiBase = inject(ApiBaseService);

  listarPedidos(): Observable<PedidoRequest[]> {
    return this.apiBase.get<PedidoRequest[]>('/VeggieDelivery/listaDePedidos');
  }

  crearPedido(body: PedidoRequest): Observable<PedidoRequest> {
    return this.apiBase.post<PedidoRequest>('/VeggieDelivery/crearPedido', body);
  }

  modificarPedido(body: PedidoRequest): Observable<PedidoRequest> {
    return this.apiBase.put<PedidoRequest>('/VeggieDelivery/modificarPedido', body);
  }


  eliminarPlato(id: number): Observable<any> {
    return this.apiBase.delete(`/VeggieDelivery/plato/${id}`)
  }

  //TODO: A RESOLVER
  listarPedidosDeUsuario(idUsuario: number): Observable<PedidoRequest[]> {
    return this.apiBase.get<PedidoRequest[]>(`/VeggieDelivery/pedidosDeUsuario/${idUsuario}`);
  }

  historialPedidos(idUsuario: number): Observable<HistorialRequest[]> {
    return this.apiBase.get<HistorialRequest[]>(`/VeggieDelivery/historialPedido/${idUsuario}`);
  }

}

export interface HistorialRequest {
  id: number;
  direccion: {
    altura: number
    direccionId: number
    nombreCalle: string
    tipoVivienda: string,
    zona: string
  };
  pedidos: {
    pedidoDetalleId: number;
    pedidoId: number;
    plate: Plate;
    cantidad: number;
    subTotal: number;
  }[];
  pagoId: number;
  fechaPedido: Date;
  fechaEntrega: Date;
  fechaEntregaEstimada: Date;
  estadoPedidoId: number;
}

export interface PedidoRequest {
  pedidoId: number;
  usuarioId: number;
  direccionId: number;
  pagoId: number;
  fechaPedido: Date;
  fechaEntrega: Date;
  fechaEntregaEstimada: Date;
  estadoPedidoId: number;
}
