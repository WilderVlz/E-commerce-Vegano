import { createAction, props } from "@ngrx/store";
export const AddIdAddress = createAction('add Id address',props<{direccionId:number}>());
export const AddIdPago = createAction('add Id pago',props<{pagoId:number}>());
export const AddIdStripe = createAction('add Id stripe',props<{stripeId:string}>());
