import {Component, OnInit} from '@angular/core';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import {Location} from "@angular/common";
import {MenuService} from "@shared/services/menu-service/menu.service";
import {select, Store} from "@ngrx/store";
import {selectLoading} from "@modules/container/store/selectors/menu.selectors";
import {CartStatus} from '../../../../store/models/cart-status.model';
import {selectCart} from "../../../../store/selectors/cart.selectors";
import {MenuActions} from "@modules/container/store/actions/menu.actions";
import {CartActions} from "../../../../store/actions/cart.actions";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  faChevronLeft = faChevronLeft


  cartState: CartStatus = CartStatus.New
  isLoading = true

  menuName = ''

  constructor(private location: Location,
              private store: Store,
              public menuService: MenuService) {

  }

  ngOnInit(): void {

    this.store.pipe(select(selectLoading)).subscribe(isLoad => {
      this.isLoading = isLoad
    });

    this.store.dispatch(MenuActions.setMenu({menuName: this.menuName}))

    this.store.pipe(select(selectCart)).subscribe(cart => {
      this.cartState = cart.cart.state
    });

  }

  disabledFooter() {
    return this.cartState === CartStatus.New
  }

}
