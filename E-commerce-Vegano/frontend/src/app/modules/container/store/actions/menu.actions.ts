import {createActionGroup, props} from '@ngrx/store';



export const MenuActions = createActionGroup({
  source: 'Menu',
  events: {
    'Set Menu': props<{ menuName: string }>(),
  },
});


