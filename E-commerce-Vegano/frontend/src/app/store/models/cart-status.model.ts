export enum CartStatus {
  New = 'Listo para pedir',
  ReadyToOrder = 'Pidiendo',
  ReadyToPay = 'Preparando pago',
  PreparingOrder = 'Preparando pedido',
  Finished = 'Finalizado',
}

export const estadoPedidoIdToCartStateMap: CartStatus[] = [
  CartStatus.New,
  CartStatus.ReadyToOrder,
  CartStatus.ReadyToPay,
  CartStatus.PreparingOrder,
  CartStatus.Finished
]
