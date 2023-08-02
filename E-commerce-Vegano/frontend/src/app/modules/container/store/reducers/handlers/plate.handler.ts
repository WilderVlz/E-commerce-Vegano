import {Plate} from "@shared/interfaces/plate.interface";
import {MenuState} from "@modules/container/store/models/menu-state.model";
import {initialState} from "@modules/container/store/reducers/menu.reducer";


export function handleLoadPlatesSuccess(state: MenuState, {plates}: { plates: Plate[] }): MenuState {
  return {
    ...state,
    plates: plates,
    loading: false,
    error: null
  };
}

export function handleLoadPlatesFailure(state: MenuState, {error}: { error: string }): MenuState {
  return {
    ...state,
    plates: initialState.plates,
    loading: false,
    error: error
  };
}

export function handleSetPlateSelected(state: MenuState, {plateSelected}: { plateSelected: Plate }): MenuState {
  return {
    ...state,
    plateSelected: plateSelected
  };
}
