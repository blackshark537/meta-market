import { createAction, props } from "@ngrx/store";
import { Banner } from "../Domain/Entities";

const todos = createAction("[Banners] Leer Todos Los Banners");
const establecer = createAction("[Establecer Banners] agregar al store", props<{banners: Banner[]}>());

export const BannerCmd = {
    todos,
    establecer
}