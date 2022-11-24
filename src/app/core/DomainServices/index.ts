import { ProductService } from './product.service';
import { CategoryService } from './category.service';
import { BannerService } from './banner.service';
import { CarritoService } from './carrito.service';
import { AddressService } from './address.service';
import { SessionService } from './session.service';
import { OrserService } from './order.service';

export const effects = [
    ProductService,
    CategoryService,
    BannerService,
    CarritoService,
    AddressService,
    SessionService,
    OrserService
];