import {MenuState} from "@modules/container/store/models/menu-state.model";

export function handleLoadMenu(state: MenuState): MenuState {
  return {
    ...state,
    loading: true,
    error: null
  };
}

export function handleSetMenu(state: MenuState, {menuName}: { menuName: string }): MenuState {
  return {
    ...state,
    menu: menuName
  };
}


