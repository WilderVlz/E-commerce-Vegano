import {Component, Input} from '@angular/core';
import {Plate} from "@shared/interfaces/plate.interface";
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import {Store} from "@ngrx/store";
import {CartFacade} from "@shared/services/facades/cart.facade";

@Component({
  selector: 'app-card-plate',
  templateUrl: './card-plate.component.html',
  styleUrls: ['./card-plate.component.scss']
})
export class CardPlateMenuComponent {
  @Input() plate!: Plate;
  @Input() truncate: boolean = true;


  faPlus = faPlus

  constructor(private store: Store,
              private cartFacade: CartFacade) {

  }


  addCart() {
    let order = {
      id: -1,
      plate: this.plate,
      count: 1,
      totalParcial: this.plate.precio,
    }
    this.cartFacade.addOrder(order)

  }


}


