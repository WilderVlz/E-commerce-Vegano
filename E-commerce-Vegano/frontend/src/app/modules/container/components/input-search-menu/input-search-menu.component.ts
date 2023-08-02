import {Component} from '@angular/core';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import {Store} from "@ngrx/store";
import {FilterActions} from "@modules/container/store/actions/filters.actions";


@Component({
  selector: 'app-input-search-menu',
  templateUrl: './input-search-menu.component.html',
  styleUrls: ['./input-search-menu.component.scss']
})
export class InputSearchMenuComponent {
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private store: Store) {
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.store.dispatch(FilterActions.updateBySearch({searchTerm: inputValue}))
  }

}
