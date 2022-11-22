import { createReducer, on } from "@ngrx/store";
import { ProductCmd } from "../Commands";
import { Product } from "../Domain/Entities";


const initialState: Product[] = [];
const descuentoState: Product[] = [];
const selectState: Product[]=[];

export const productReducer = createReducer(
    initialState,
    on(ProductCmd.establecer, (state, { productos })=> productos),
    on(ProductCmd.limpiarBusqueda, (state)=> []),
);

export const descuentoReducer = createReducer(
    descuentoState,
    on(ProductCmd.establecerDescuento, (state, { productos })=> productos)
);

export const setProductReducer = createReducer(
    selectState,
    on(ProductCmd.elegirUno, (state, { producto })=> [producto]),
    on(ProductCmd.establecerUno, (state, { producto })=> producto),
);
