import { createAction, props } from "@ngrx/store";
import { Address } from "../Domain/Entities/Address";
import { iAddress } from "../Domain/Interfaces";

const obtener = createAction("[Obtener Direcciones] obtener listado de mis direcciones");
const hacerlaPrincipal = createAction("[Actualizar Direccion] hacerla principal", props<{address: Address}>());
const establecer = createAction("[Establecer Direcciones] agregar lista de direcciones", props<{addresses: Address[]}>());
const agregar = createAction("[Agregar Direccion] agregar una direccion", props<{address: iAddress}>());
const borrar = createAction("[Borrar Direccion] borrar una direccion", props<{address: Address}>());

export const AddressCmd = {
    obtener,
    establecer,
    agregar,
    hacerlaPrincipal,
    borrar
}