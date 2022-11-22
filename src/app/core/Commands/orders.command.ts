import { createAction, props } from "@ngrx/store";
import { iOrder } from "../Domain/Interfaces";

const hacerPedido = createAction("[Pedidos] hacer un pedido");
const obtenerPedidos = createAction("[Pedidos] obtener todos mis pedidos");
const establecerPedidos = createAction("[Pedidos] establecer pedidos", props<{ pedidos: iOrder[]}>());

export const OrderCmd = {
    hacerPedido,
    obtenerPedidos,
    establecerPedidos
}