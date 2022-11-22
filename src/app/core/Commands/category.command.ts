import { createAction, props } from "@ngrx/store";
import { Category } from "../Domain/Entities";

const todas = createAction("[Categorias] todas las categorias");
const establecer = createAction("[Establecer Categorias] agregar categorias al store", props<{categories: Category[]}>());

export const CategoryCmd = {
    todas,
    establecer
}