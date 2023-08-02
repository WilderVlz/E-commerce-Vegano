import {Plate} from "@shared/interfaces/plate.interface";

export interface Order {//PedidoDetalle
  id?: number;//idPedidoDetalle
  plate: Plate;
  count: number;
  totalParcial: number;
}
