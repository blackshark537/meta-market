import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Carrito, AppState } from 'src/app/core/Domain/Entities';

@Component({
  selector: 'app-cart-count',
  templateUrl: './cart-count.component.html',
  styleUrls: ['./cart-count.component.scss'],
})
export class CartCountComponent {
  protected carrito$: Observable<Carrito[]>

  constructor(
    protected store: Store<AppState>
  ) { 
    this.carrito$ = store.select('carrito');
  }

}
