import {Component, Input} from '@angular/core';
import {Plate} from "@shared/interfaces/plate.interface";
import {select, Store} from "@ngrx/store";
import {selectFilters} from "@modules/container/store/selectors/menu.selectors";

import {Filters} from "@modules/container/components/group-button-filter-menu/group-button-filter-menu.component";

import {MenuPlate} from "@shared/interfaces/menu-plate.interface";

import {Router} from "@angular/router";
import {
  filterPlatesByCategory,
  filterPlatesBySinTACC,
  filterPlatesByTerm,
  filterPlatesByType,
  filterPlatesByVegan
} from "@shared/utils/helpers/filters.helpers";
import {PlateActions} from "@modules/container/store/actions/plates.actions";

@Component({
  selector: 'app-deck-menu',
  templateUrl: './deck-menu.component.html',
  styleUrls: ['./deck-menu.component.scss']
})
export class DeckMenuComponent {

  @Input() menu!: MenuPlate;

  filters: Filters = {
    activateFilterSinTacc: false,
    activateFilterVegano: false,
    activateFilterByCategory: '',
    activateFilterByType: '',
    activateFilters: false,
    activateFilterSearchTerm: ''
  }
  plates: Plate[] = []
  renderDeck: boolean = true

  constructor(private store: Store, private router: Router) {

  }


  ngOnInit(): void {
    this.store.pipe(select(selectFilters)).subscribe(filters => {
      this.filters = filters
      this.plates = this.filterPlates(this.menu.plates)
    });

  }

  selectedPlate(plate: Plate) {

    this.store.dispatch(PlateActions.setSelected({plateSelected: plate}))
    this.router.navigateByUrl('/container/descripcion');

  }

  private filterPlates(plates: Plate[]) {
    let platosFiltered = plates;

    if (this.filters.activateFilters) {

      if (this.filters.activateFilterByType.length > 0) {
        platosFiltered = filterPlatesByType(platosFiltered, this.filters.activateFilterByType);
      }
      if (this.filters.activateFilterSearchTerm.length > 0) {
        platosFiltered = filterPlatesByTerm(platosFiltered, this.filters.activateFilterSearchTerm);
      }
      if (this.filters.activateFilterVegano) {
        platosFiltered = filterPlatesByVegan(platosFiltered, this.filters.activateFilterVegano);
      }
      if (this.filters.activateFilterSinTacc) {
        platosFiltered = filterPlatesBySinTACC(platosFiltered, this.filters.activateFilterSinTacc);
      }
      if (this.filters.activateFilterByCategory.length > 0) {
        platosFiltered = filterPlatesByCategory(platosFiltered, this.filters.activateFilterByCategory);
      }
    }

    this.renderDeck = platosFiltered.length > 0;
    return platosFiltered
  }

}
