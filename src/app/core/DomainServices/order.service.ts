import { Injectable } from "@angular/core";
import { MessagePort } from '../Ports'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { CarritoCmd, OrderCmd } from "../Commands";
import * as Parse from "parse";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { iOrder } from "../Domain/Interfaces";


@Injectable()
export class OrserService {

    makeOrder$ = createEffect(()=> this.actions$.pipe(
        ofType(OrderCmd.hacerPedido),
        tap(async action=>{
            const load = await this.msgPort.loading();
            const resp = await Parse.Cloud.run("hacerPedido")
            .catch(async error=> await this.msgPort.presentToast(error));
            load.dismiss();
            if(!!resp){ 
                await this.msgPort.presentToast(resp.msg);
                this.store.dispatch(CarritoCmd.obtenerCarrito());
                this.router.navigate(['/tabs/purchases']);
            }
        })
    ), { dispatch: false });

    getOrders$ = createEffect(() => this.actions$.pipe(
        ofType(OrderCmd.obtenerPedidos),
        tap(async ()=>{
            const load = await this.msgPort.loading();
            const pedidos: iOrder[] = await Parse.Cloud.run("obtenerPedidos")
            .catch(async error=> await this.msgPort.presentToast(error));
            load.dismiss();
            this.store.dispatch(OrderCmd.establecerPedidos({pedidos}));
        })
    ), { dispatch: false })

    constructor(
        protected store: Store,
        protected actions$: Actions,
        protected msgPort: MessagePort,
        protected router: Router
    ){}
}