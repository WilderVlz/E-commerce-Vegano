import {  ICard } from './../models/card.interface';
import { createAction, props } from "@ngrx/store";


export const AddCard = createAction('add Card',props<{card:ICard}>());
