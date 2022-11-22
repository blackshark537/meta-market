import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductCmd } from 'src/app/core/Commands';
import { AppState, Product } from 'src/app/core/Domain/Entities';
import { iProduct } from 'src/app/core/Domain/Interfaces';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit, iProduct {

  @Input('product') product?: Product;
  protected attr: any;
  protected vRate = 0; // virtual rate temp
  constructor(
    protected readonly router: Router,
    protected readonly store: Store<AppState>
  ) { }
  
  ngOnInit() {
    this.attr = this.product?.attributes;
    this.vRate = parseFloat(((Math.random() * 4)+1).toFixed(1));
  }

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

  get contenido(): number{
    return this.attr.contenido;
  };

  get medida(): string{
    return this.attr.medida;
  };

  get unidad(): string
  {
    return this.attr.unidad
  }

  get rate(): number{
    return this.attr.rate === 0? this.vRate :  this.attr.rate;
  };

  open(){
    if(!this.product) return;
    const id = this.product.id;
    this.store.dispatch(ProductCmd.elegirUno({ producto: this.product }));
    this.router.navigate(['product'], {
      queryParams: { id }
    })
  }
}
