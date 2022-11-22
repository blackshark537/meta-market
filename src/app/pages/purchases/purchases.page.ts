import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from 'os';
import { Observable } from 'rxjs';
import { OrderCmd } from 'src/app/core/Commands';
import { AppState } from 'src/app/core/Domain/Entities';
import { iOrder } from 'src/app/core/Domain/Interfaces';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
})
export class PurchasesPage implements OnInit {
  protected orders$: Observable<iOrder[]>;
  protected colors: {[name: string]: string} = {
    "procesando": "secundary",
    "aceptado": "primary",
    "enviado": "danger",
    "entregado": "success"
  };

  icons: {[name: string]: string} = {
    "procesando": "checkmark",
    "aceptado": "checkmark",
    "enviado": "bicycle",
    "entregado": "checkmark-circle"
  };

  constructor(
    protected store: Store<AppState>
  ) { 
    this.orders$ = store.select("pedidos");
  }

  ngOnInit() {
    this.store.dispatch(OrderCmd.obtenerPedidos());
  }

}

