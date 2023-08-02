import {Component, Input, OnInit} from '@angular/core';
import {faPlus} from '@fortawesome/free-solid-svg-icons'

import {Store} from "@ngrx/store";
import {Order} from "../../../../store/models/order.model";
import {Plate} from "@shared/interfaces/plate.interface";
import {CartFacade} from "@shared/services/facades/cart.facade";


@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss']
})
export class CardOrderComponent implements OnInit {

  @Input() order!: Order;

  count: number = 1
  faPlus = faPlus

  constructor(private store: Store, private cartFacade: CartFacade) {

  }

  ngOnInit(): void {
    this.count = this.order.count
  }

  getPlate(): Plate {
    return this.order.plate
  }

  onCountChange(newValue: number) {
    this.count = newValue;
    let order = {
      ...this.order,
      count: this.count,
      totalParcial: this.count * this.getPlate().precio,
    }
    if (newValue >= 1) {
      this.cartFacade.updateOrder(order)
    } else {
      this.cartFacade.removeOrderToCart(order)

    }
  }


}


