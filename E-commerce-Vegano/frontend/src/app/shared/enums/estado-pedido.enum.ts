export enum EstadoPedido {
  NUEVO = "Nuevo",
  PREPARANDO = "Preparando",
  POR_ENTREGAR = "Por entregar",
  ENTREGADO = "Entregado",
	ANULADO = "Anulado"
}

export const obtenerEstadosPedido = (): string[] => {

  return Object.values(EstadoPedido).filter(value => typeof value === 'string');

}
