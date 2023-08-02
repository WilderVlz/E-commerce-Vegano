import {Component, inject, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {faCheckCircle} from "@fortawesome/free-regular-svg-icons";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {CartState} from "../../../../store/models/cart.model";
import {CartStatus} from "../../../../store/models/cart-status.model";
import {CartActions} from "../../../../store/actions/cart.actions";
import {CartFacade} from "@shared/services/facades/cart.facade";


@Component({
  selector: 'app-button-modal-order-details',
  templateUrl: './button-modal-order-details.component.html',
  styleUrls: ['./button-modal-order-details.component.scss']
})
export class ButtonModalOrderDetailsComponent implements OnInit {

  faCart = faCartShopping
  faCartSuccess = faCheckCircle

  shoppingCart: CartState = {
    cart: {
      id: 0,
      orders: [],
      total: 0,
      state: CartStatus.New,
    },
    loading: false,
    error: null
  }

  private modalService = inject(NgbModal);


  constructor(private store: Store,
              private cartFacade: CartFacade,
              private router: Router) {
  }

  ngOnInit(): void {

    this.cartFacade.getCart().subscribe(cart => {
      console.log(cart);

      this.shoppingCart = cart
    })
  }

  goToPayment() {
    this.modalService.dismissAll();
    this.store.dispatch(CartActions.setState({state: CartStatus.ReadyToPay}));
    this.router.navigateByUrl("/container/shopping");
  }

  open(content: any) {
    this.modalService.open(content, {
      scrollable: true,
      modalDialogClass: 'me-0 my-0 vh-100'
    })
  }

}
