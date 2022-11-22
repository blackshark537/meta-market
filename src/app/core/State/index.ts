
import { addressReducer } from './address.reducer';
import { bannerReducer } from './banner.reducer';
import { carritoReducer } from './carrito.reducer';
import { categoryReducer } from './category.reducer';
import { orderReducer } from './order.reducer';
import { productReducer, setProductReducer, descuentoReducer } from './product.reducer';

export const reducers = {
    productos: productReducer,
    categorias: categoryReducer,
    banners: bannerReducer,
    carrito: carritoReducer,
    elegido: setProductReducer,
    descuentos: descuentoReducer,
    direcciones: addressReducer,
    pedidos: orderReducer
};