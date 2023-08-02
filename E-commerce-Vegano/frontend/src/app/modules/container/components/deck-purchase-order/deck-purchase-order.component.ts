import {Component, OnInit} from '@angular/core';
import {UserFacade} from "@shared/services/facades/user.facade";
import {HistorialRequest} from "@shared/services/pedido.service";

@Component({
  selector: 'app-deck-purchase-order',
  templateUrl: './deck-purchase-order.component.html',
  styleUrls: ['./deck-purchase-order.component.scss']
})
export class DeckPurchaseOrderComponent implements OnInit {

  historial: HistorialRequest[] = [];

  constructor(private userFacade: UserFacade) {

  }

  ngOnInit(): void {
    this.userFacade.getHistorial().subscribe(historial => {
      this.historial = historial
    })
  }


}
