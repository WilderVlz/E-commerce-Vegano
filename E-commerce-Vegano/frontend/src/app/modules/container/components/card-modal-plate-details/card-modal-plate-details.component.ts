import {Component, inject, Input} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {faLeaf, faSlash, faWheatAlt, faWheatAwnCircleExclamation} from "@fortawesome/free-solid-svg-icons";
import {Plate} from "@shared/interfaces/plate.interface";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {CartFacade} from "@shared/services/facades/cart.facade";

@Component({
  selector: 'app-card-modal-plate-details',
  templateUrl: './card-modal-plate-details.component.html',
  styleUrls: ['./card-modal-plate-details.component.scss']
})
export class CardModalPlateDetailsComponent {
  @Input() plate!: Plate
  iconConTacc = faWheatAwnCircleExclamation
  iconSinTacc = faWheatAlt
  iconVegano = faLeaf
  iconSlash = faSlash
  private modalService = inject(NgbModal);

  count: number = 1

  constructor(private store: Store,
              private router: Router,
              private cartFacade: CartFacade
  ) {
  }

  open(content: any) {
    this.modalService.open(content, {size: 'lg'})
  }

  onCountChange(newValue: number) {
    console.log("cambiando")
    this.count = newValue;
  }

  addCart() {
    let order = {
      id: -1,
      plate: this.plate,
      count: this.count,
      totalParcial: this.count * this.plate.precio,
    }

    this.cartFacade.addOrder(order)
    this.router.navigateByUrl('/container/menu');
    this.modalService.dismissAll('Save click');
  }
}
