import {Component, Input, OnInit} from '@angular/core';

import {select, Store} from "@ngrx/store";
import {FilterActions} from "@modules/container/store/actions/filters.actions";
import {selectFilters, selectMenu} from "@modules/container/store/selectors/menu.selectors";
import {MenuActions} from "@modules/container/store/actions/menu.actions";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-group-button-filter-menu',
  templateUrl: './group-button-filter-menu.component.html',
  styleUrls: ['./group-button-filter-menu.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height: '*',
        opacity: 1,
      })),
      state('closed', style({
        height: '0',
        opacity: 0,
      })),
      transition('closed => open', animate('300ms ease-in-out')),
    ]),
  ],
})
export class GroupButtonFilterMenuComponent implements OnInit {
  @Input() filtersMenu?: string[];
  @Input() filtersCategories?: string[] = [];
  @Input() filtersType?: string[];


  isExpanded = true;


  menu = ''
  category = ''

  filter: Filters = {
    activateFilterSinTacc: false,
    activateFilterVegano: false,
    activateFilterByCategory: '',
    activateFilters: true,
    activateFilterByType: '',
    activateFilterSearchTerm: ''
  }


  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.pipe(select(selectFilters)).subscribe(filters => {
      this.filter = filters
      this.category = filters.activateFilterByCategory
    });
    this.store.pipe(select(selectMenu)).subscribe(menuName => {
      this.menu = menuName
    });


  }

  isMenuSelected(menuName: string) {
    return menuName === this.menu
  }

  toggleMenu(name: string): void {
    this.store.dispatch(MenuActions.setMenu({menuName: name}));
  }

  toggleCategory(name: string): void {
    this.store.dispatch(FilterActions.updateByCategory({filterNames: name}));
  }

  toggleVegano(): void {
    this.store.dispatch(FilterActions.toggleVegano())

  }

  toggleSinTacc(): void {
    this.store.dispatch(FilterActions.toggleSinTacc())
  }

  toggleViewAll(): void {
    this.store.dispatch(FilterActions.removeAll())
  }

  toggleType(name: string): void {
    if (this.menu !== name) {
      this.isExpanded = false;
      this.store.dispatch(MenuActions.setMenu({menuName: name}));
      this.store.dispatch(FilterActions.updateByType({filterType: name}));
      setTimeout(() => {
        this.isExpanded = true; // Después de 1 segundo, cambia el estado a expandido
      }, 600);
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

}

export interface Filters {
  activateFilterSinTacc: boolean;
  activateFilterVegano: boolean;
  activateFilterByCategory: string;
  activateFilterByType: string;
  activateFilterSearchTerm: string;
  activateFilters: boolean;
}
