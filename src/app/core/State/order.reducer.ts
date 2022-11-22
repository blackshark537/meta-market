import { createReducer, on } from "@ngrx/store";
import { OrderCmd } from "../Commands";
import { iOrder } from "../Domain/Interfaces";


const initialState: iOrder[] = [];

export const orderReducer = createReducer(
    initialState,
    on(OrderCmd.establecerPedidos, (state, { pedidos })=> pedidos)
);
