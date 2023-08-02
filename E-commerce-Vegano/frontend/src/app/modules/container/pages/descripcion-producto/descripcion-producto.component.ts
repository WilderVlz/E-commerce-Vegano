import {Component} from '@angular/core';
import {Plate} from "@shared/interfaces/plate.interface";
import {selectPlateSelected} from "@modules/container/store/selectors/menu.selectors";

import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'

import {select, Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {CartFacade} from "@shared/services/facades/cart.facade";

@Component({
  selector: 'app-descripcion-producto',
  templateUrl: './descripcion-producto.component.html',
  styleUrls: ['./descripcion-producto.component.scss']
})
export class DescripcionProductoComponent {
  plate?: Plate
  showPlate: boolean = false
  count: number = 1

  faChevronLeft = faChevronLeft

  constructor(private store: Store,
              private cartFacade: CartFacade,
              private router: Router) {
    this.store.pipe(select(selectPlateSelected)).subscribe(plate => {
      this.plate = plate ?? undefined;
      this.showPlate = plate !== undefined;
    });
  }

  addCart() {
    let order = {
      id: 0,
      plate: this.plate!,
      count: this.count,
      totalParcial: this.count * this.plate!.precio,
    }
    this.cartFacade.addOrder(order)
    this.router.navigateByUrl('/container/menu');

  }


}
