import { createReducer, on } from "@ngrx/store";
import { CarritoCmd } from "../Commands";
import { Carrito } from "../Domain/Entities";


const initialState: Carrito[] = [];

export const carritoReducer = createReducer(
    initialState,
    on(CarritoCmd.establecer, (state, { carrito })=> carrito)
);
