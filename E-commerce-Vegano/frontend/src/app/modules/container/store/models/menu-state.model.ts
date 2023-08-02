import {Plate} from "@shared/interfaces/plate.interface";


export interface MenuState {
  menu: string;
  plates: Plate[];
  plateSelected?: Plate;
  activateFilterSearchTerm: string;
  activateFilterSinTacc: boolean;
  activateFilterVegano: boolean;
  activateFilterByCategory: string;
  activateFilterByType: string;
  activateFilters: boolean;
  loading: boolean;
  error: string | null;
}
