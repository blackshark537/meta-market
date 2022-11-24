import { createAction, props } from "@ngrx/store";
import { Carrito } from "../Domain/Entities";

const obtenerCarrito = createAction("[Obtener Carrito] obtener todos los produtos del carrito");
const vaciarCarrito = createAction("[Vaciar Carrito] vaciar todos los produtos del carrito");
const agregarAlCarrito = createAction("[Agregar Al Carrito] agregar un producto al carrito", props<{
    productoId: string,
    qty: number
}>());
const removerDelCarrito = createAction("[Remover Del Carrito] remover un producto al carrito", props<{
    id: string,
}>());
const establecer = createAction("[Establecer Carrito] poner todos los produtos del carrito en el Store", props<{
    carrito: Carrito[]
}>())

const increment = createAction("[Carrito Increment] incrementa la cantidad de un producto", props<{id: string}>())
const decrement = createAction("[Carrito Decrement] decrementa la cantidad de un producto", props<{id: string}>())

export const CarritoCmd = {
    obtenerCarrito,
    agregarAlCarrito,
    vaciarCarrito,
    removerDelCarrito,
    establecer,
    increment,
    decrement
};