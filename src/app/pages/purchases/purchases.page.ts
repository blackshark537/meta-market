import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  protected orders: string[] = [];
  protected orderIndex: {[date: string]: iOrder[]} = {};
  protected requested = false;

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
    store.select("pedidos").subscribe(orders=>{
      if(!orders.length && !this.requested){ 
        this.store.dispatch(OrderCmd.obtenerPedidos());
        this.requested = true;
        return;
      }
      
      const fechas = orders.map(order=> this.getId(order.fecha));
      
      fechas.forEach(fecha=>{
        this.orderIndex[fecha] = orders.filter(el=> fecha === this.getId(el.fecha));
      });

      this.orders = Object.keys(this.orderIndex);
    });
  }

  ngOnInit() {
    
  }

  getId(fecha: Date): string{
    return `${fecha.getMonth()}-${fecha.getDate()}-${fecha.getFullYear()}`;
  }

  handleRefresh(event: any)
  {
    setTimeout(() => {
      // Any calls to load data go here
      this.store.dispatch(OrderCmd.obtenerPedidos());
      event.target.complete();
    }, 2000);
  }

}

