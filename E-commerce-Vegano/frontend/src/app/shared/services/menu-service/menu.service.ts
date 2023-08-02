import {Injectable} from '@angular/core';
import {MenuPlate} from "@shared/interfaces/menu-plate.interface";
import {Plate} from "@shared/interfaces/plate.interface";
import {select, Store} from "@ngrx/store";

import {selectMenu, selectPlates} from "@modules/container/store/selectors/menu.selectors";
import {filterPlatesByCategory, filterPlatesByType} from "@shared/utils/helpers/filters.helpers";
import {PlateService} from "@shared/services/plate.service";
import {PlateActions} from "@modules/container/store/actions/plates.actions";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  plates: Plate[] = [];
  tipoMenu = '';

  constructor(private store: Store, private plateService: PlateService) {
    this.loadPlates();

    this.store.pipe(select(selectMenu)).subscribe((menuName: string) => {
      this.tipoMenu = menuName;
    });

    this.store.pipe(select(selectPlates)).subscribe((plates: Plate[]) => {
      this.plates = plates;
    });
  }

  /**
   * Carga los platos del menú.
   * @returns void
   * @note Este método despacha la acción de carga del menú y se suscribe a la respuesta del servicio de platos.
   * En caso de éxito, se despacha la acción de carga exitosa de los platos con los platos obtenidos.
   * En caso de error, se despacha la acción de carga fallida de los platos con el mensaje de error.
   */
  loadPlates() {
    this.store.dispatch(PlateActions.load());

    this.plateService.listarPlatos().subscribe({
      next: (response: Plate[]) => {
        this.store.dispatch(PlateActions.loadSuccess({plates: response}));
      },
      error: (message: string) => {
        this.store.dispatch(PlateActions.loadFailure({error: message}));
      }
    });
  }


  /**
   * Obtiene los tipos de menú únicos a partir de los platos.
   * @returns Un array de strings con los tipos de menú únicos.
   * @note Este método utiliza los platos almacenados en la propiedad `plates` para obtener los tipos de menú únicos.
   */
  getTipoMenu(): string[] {
    return [...new Set(this.plates.map((menu: Plate) => menu.tipoPlato))];
  }

  /**
   * Obtiene las categorías de menú a partir de los platos filtrados por tipo de menú.
   * @returns Un array de strings con las categorías de menú.
   * @note Este método utiliza los platos almacenados en la propiedad `plates` y el tipo de menú actualmente seleccionado en la propiedad `tipoMenu`.
   */
  getCategories(): string[] {
    const filteredPlates = filterPlatesByType(this.plates, this.tipoMenu);
    return [...new Set(filteredPlates.map((menu: Plate) => menu.categoria))];
  }

  /**
   * Crea un menú en base al tipo de plato ingresado y devuelve un array de objetos MenuPlate.
   * @param tipoPlato El tipo de plato para filtrar los platos del menú. Por defecto, es una cadena vacía.
   * @returns Un array de objetos MenuPlate generado en base a los platos con el mismo nombre.
   * @note Este método utiliza el método `getCategories()` para obtener las categorías de menú disponibles y crea un objeto MenuPlate por cada categoría de menú.
   */
  createMenu(tipoPlato: string = ''): MenuPlate[] {
    this.createMenuAll()
    return this.getCategories().map((name: string) => this.createMenuPlate(name));
  }


  createMenuAll() {
    const allCategories = [...new Set(this.plates.map(value => value.categoria))]

    return allCategories.map(category => {
      return {
        category: category,
        plates: filterPlatesByCategory(this.plates, category)
      }
    });
  }


  /**
   * Crea un objeto MenuPlate en base al nombre del plato y los platos correspondientes.
   * @param name El nombre del plato para el menú.
   * @returns Un objeto MenuPlate con el nombre del plato y los platos correspondientes.
   * @note Este método utiliza la propiedad `plates` para filtrar los platos por categoría y crear el objeto MenuPlate.
   */
  createMenuPlate(name: string): MenuPlate {
    return {
      category: name,
      plates: filterPlatesByCategory(this.plates, name)
    };
  }

}

