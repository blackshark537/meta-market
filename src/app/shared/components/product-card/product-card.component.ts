import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/core/Domain/Entities';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit, AfterContentInit {
  @Input('product') product?: Product;
  @ViewChild('cardImg', { static: true }) cardImg?: ElementRef;
  protected attr: any;
  protected img = new Image();
  protected loaded = false;

  constructor() { }

  ngOnInit() {
    this.attr = this.product?.attributes;
  }

  ngAfterContentInit(): void {
    this.img.src = this.foto.replace("thumbs", "large");
    this.img.onload =(ev)=>{
      const el = this.cardImg?.nativeElement as HTMLElement;
      el.children[0].remove();
      el.appendChild(this.img);
      this.loaded = true;
    }
    
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
    return (this.attr.foto as string)//.replace("thumbs", "large");
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

  get rate(): number{
    return this.attr.rate
  };
}
