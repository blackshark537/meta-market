import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { exhaustMap,Observable, of, Subscription } from 'rxjs';
import { CarritoCmd } from 'src/app/core/Commands';
import { AppState, Product } from 'src/app/core/Domain/Entities';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnDestroy {

  protected products$: Observable<Product[]>; 
  protected sub$!: Subscription;
  protected fetched = false;

  constructor(
    protected readonly store: Store<AppState>
  ) { 
    this.products$ = this.store.select('carrito');
    this.sub$ = this.products$.subscribe(resp=>{
      if(!resp.length && !this.fetched){
        store.dispatch(CarritoCmd.obtenerCarrito());
        this.fetched = true;
      }
    });
  }

  ngOnDestroy(): void {
      if(this.sub$) this.sub$.unsubscribe();
  }

  handleRefresh(event: any)
  {
    setTimeout(() => {
      // Any calls to load data go here
      this.store.dispatch(CarritoCmd.obtenerCarrito());
      event.target.complete();
    }, 2000);
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
          return (precio - descuento) * item.cantidad;

        }).reduce((p, c)=> p+= c, 0);
        return of(value);
      })
    )
  }

  emptyCart(){
    this.store.dispatch(CarritoCmd.vaciarCarrito());
  }
}
