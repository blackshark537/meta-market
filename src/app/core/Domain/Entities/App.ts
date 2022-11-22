
import { iOrder } from "../Interfaces";
import { Address } from "./Address";
import { Banner } from "./Banner";
import { Carrito } from "./Carrito";
import { Category } from "./Category";
import { Like } from "./Like";
import { Product } from "./Product";

export class AppState {
    productos: Product[] = [];
    descuentos: Product[] = [];
    categorias: Category[] = [];
    banners: Banner[] = [];
    carrito: Carrito[] = [];
    likes: Like[] = [];
    elegido?: Product[] = [];
    direcciones?: Address[] = [];
    pedidos: iOrder[] = [];
}