import {Component, Input} from '@angular/core';
import {HistorialRequest} from "@shared/services/pedido.service";

@Component({
  selector: 'app-card-purchase-order',
  templateUrl: './card-purchase-order.component.html',
  styleUrls: ['./card-purchase-order.component.scss']
})
export class CardPurchaseOrderComponent {
  @Input() historial!: HistorialRequest

  getTitle() {
    return this.historial.pedidos[0].plate.nombre
  }

  getAddress() {
    const direccion = this.historial.direccion
    return `${direccion.nombreCalle}  ${direccion.altura}`
  }

  getTime() {
    //return `${this.historial.fechaPedido}  ${this.historial.fechaEntrega}`
    return `${this.historial.fechaPedido}`
  }

}
