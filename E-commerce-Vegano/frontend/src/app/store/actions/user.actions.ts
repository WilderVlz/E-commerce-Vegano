import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {Order} from "../models/order.model";
import {User} from "@shared/interfaces/user.interface";
import {Customer} from "@shared/services/customer.service";
import {UserAPI} from "@shared/services/user.service";
import {HistorialRequest} from "@shared/services/pedido.service";

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Load User': props<{ id: number }>(),
    'Load User Success': props<{ user: UserAPI }>(),
    'Load User Failure': props<{ error: string }>(),

    'Load Customer': props<{ id: number }>(),
    'Load Customer Success': props<{ customer: Customer }>(),
    'Load Customer Failure': props<{ error: string }>(),


    'Load History': emptyProps(),
    'Load History Success': props<{ historial: HistorialRequest[] }>(),
    'Load History Failure': props<{ error: string }>(),
  },
});
