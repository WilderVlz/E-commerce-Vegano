import { createReducer, on } from "@ngrx/store";
import { AddIdAddress } from "../actions/pedido.actions";
import { ICard } from "../models/card.interface";
import { AddCard } from "../actions/card.actions";

export const estadoInicial:ICard={
  name:"",
  exp_month:0,
  exp_year:0,
  brand:"",
  last4:""
};

export const cardReducer = createReducer(
  estadoInicial,
  on(AddCard,(state,{card})  =>{


    return {...state,card}
  }));
