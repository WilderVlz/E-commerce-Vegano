import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Plate} from "@shared/interfaces/plate.interface";


export const PlateActions = createActionGroup({
  source: 'Plate',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ plates: Plate[] }>(),
    'Load Failure': props<{ error: string }>(),
    'Set Selected': props<{ plateSelected: Plate }>(),
  },
});
