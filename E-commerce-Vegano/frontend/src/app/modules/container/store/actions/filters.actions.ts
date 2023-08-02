import {createActionGroup, emptyProps, props} from '@ngrx/store';


export const FilterActions = createActionGroup({
  source: 'Filter',
  events: {
    'Remove All': emptyProps(),
    'Toggle Vegano': emptyProps(),
    'Toggle Sin Tacc': emptyProps(),
    'Update By Type': props<{ filterType: string }>(),
    'Update By Category': props<{ filterNames: string }>(),
    'Update By Search': props<{ searchTerm: string }>(),
  },
});
