import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable, of, Subscription } from 'rxjs';
import { AddressCmd, CarritoCmd, OrderCmd } from 'src/app/core/Commands';
import { Address, AppState, Product } from 'src/app/core/Domain/Entities';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {
  protected sub$!: Subscription;
  protected addresses: Address[] | undefined;
  protected products$: Observable<Product[]>; 
  protected envio: number = 0;

  constructor(
    protected readonly router: Router,
    protected readonly store: Store<AppState>
  ) { 
    this.products$ = this.store.select('carrito');
  }

  ngOnInit() {
    this.store.dispatch(AddressCmd.obtener());
    this.store.dispatch(CarritoCmd.obtenerCarrito());

    this.sub$ = this.store.select("direcciones").subscribe(addresses=>{
      if(!addresses?.length) return;
      this.addresses = [...addresses];
    });
  }

  ngOnDestroy() {
      if(this.sub$) this.sub$.unsubscribe();
  }

  makeOrder() {
    this.store.dispatch(OrderCmd.hacerPedido());
  }

  get address(): string | undefined {
    return this.addresses?.filter(address=> (address.attributes as any).principal)[0].id;
  }

  getTotal(products: Observable<any[]>): Observable<number>
  {
    return products.pipe(
      exhaustMap((action)=>{ 
        const value = action.map((item)=> { 
          
          const precio = parseFloat(item.precio_venta);
          let descuento = 0;
          
          if(item.en_oferta) {
            descuento = item.descuento * 100 / precio;
          }
          return ((precio - descuento) * item.cantidad) + this.envio;

        }).reduce((p, c)=> p+= c, 0);
        return of(value);
      })
    )
  }

}
