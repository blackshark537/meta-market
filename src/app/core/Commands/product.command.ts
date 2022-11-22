import { createAction, props } from "@ngrx/store";
import { Product } from "../Domain/Entities";

const enDescuento = createAction("[En Descuento] todos los productos en descuento");
const buscar = createAction("[Buscar] buscar un producto por nombre", props<{nombre: string}>());
const limpiarBusqueda = createAction("[Limpiar Busqueda] vaciar Busqueda");
const buscarPorId = createAction("[Buscar] buscar un producto por objectId", props<{id: string}>());
const buscarPorCategoria = createAction("[Buscar] buscar un producto por categoria", props<{categoria: string}>());
const meGusta = createAction("[Me Gusta] dar me gusta a un producto", props<{productoId: string}>());

const establecer = createAction("[Establecer Productos] establecer productos en el estore", props<{productos: Product[]}>());
const establecerDescuento = createAction("[Establecer Productos] establecer productos de descuentos en el estore", props<{productos: Product[]}>());
const elegirUno = createAction("[Elegir Un Producto] elegir un producto en el estore", props<{producto: Product}>());
const establecerUno = createAction("[Establecer Un Producto] seleccionar un productos en el estore", props<{producto: Product[]}>());

export const ProductCmd = {
    enDescuento,
    buscar,
    limpiarBusqueda,
    buscarPorId,
    buscarPorCategoria,
    meGusta,
    establecer,
    establecerUno,
    elegirUno,
    establecerDescuento
}