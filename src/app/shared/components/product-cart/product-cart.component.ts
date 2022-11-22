import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarritoCmd } from 'src/app/core/Commands';
import { iProduct } from 'src/app/core/Domain/Interfaces';


@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements iProduct {
  @Input('product') attr: any;

  constructor(
    protected store: Store

  ) { }

  get codigo(): string {
    return this.attr.codigo;
  }

  get categoria(): string {
    return this.attr.categoria;
  };

  get nombre(): string{
    return this.attr.nombre;
  }

  get foto(): string {
    return this.attr.foto
  }

  get precio():  number{
    return parseFloat(this.attr.precio_venta) - this.descuento;
  }

  get precio_venta(): string
  {
    return this.attr.precio_venta;
  }

  get en_oferta(): boolean
  {
    return this.attr.en_oferta
  }

  get descuento(): number{
    if(this.en_oferta) {
     return this.attr.descuento * 100 / parseFloat(this.attr.precio_venta);
    }
    return 0
  }

  get cantidad(): number | undefined
  {
    return this.attr.cantidad;
  }

  get unidad(): string
  {
    return this.attr.unidad
  }

  get contenido(): number{
    return this.attr.contenido;
  };

  get medida(): string{
    return this.attr.medida;
  };

  rate: number = 0;

  remove()
  {
    this.store.dispatch(CarritoCmd.removerDelCarrito({id: this.attr.objectId}))
  }
}
