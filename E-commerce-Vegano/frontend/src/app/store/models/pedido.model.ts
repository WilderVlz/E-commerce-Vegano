export interface Pedido {//PedidoDetalle
  pedidoId?: number;//idPedidoDetalle
  usuarioId?: number;
  stripeId?:string;
  direccionId?: number;
  pagoId?: number;
  fechaPedido?: Date;
  fechaEntrega?:Date;
  fechaEntregaEstimada?:Date;
  estadoPedidoId?:number;
}
