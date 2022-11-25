import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { CarritoCmd } from "../Commands";
import { Product } from "../Domain/Entities";
import * as Parse from 'parse';
import { MessagePort } from '../Ports/Message.port';
import { Router } from "@angular/router";

@Injectable()
export class CarritoService {

    getCarrito$ = createEffect(()=> this.actions$.pipe(
        ofType(CarritoCmd.obtenerCarrito),
        tap(async ()=>{
            const user = Parse.User.current();
            if(!user) return;
            const carrito = await Parse.Cloud.run("obtenerCarrito")
            .catch(error=> {
                this.msgCtrl.presentToast(error);
            }) as Product[];
            if(!carrito) return;
            this.store.dispatch(CarritoCmd.establecer({carrito}))
        })
    ), { dispatch: false });

    addToCarrito$ = createEffect(()=> this.actions$.pipe(
        ofType(CarritoCmd.agregarAlCarrito),
        tap(async action=>{
            const { productoId, qty } = action;
            const user = Parse.User.current();
            if(!user){
                this.router.navigate(['/tabs/profile']);
                return;
            }
            const load = await this.msgCtrl.loading();
            const resp = await Parse.Cloud.run("agregarAlCarrito", { productoId, qty })
            .catch(error=> {
                load.dismiss();
                this.msgCtrl.presentAlert(error);
            });
            
            if(!resp) return;

            await this.msgCtrl.presentToast(resp.msg);
            load.dismiss();
            this.store.dispatch(CarritoCmd.obtenerCarrito());
        })
    ), { dispatch: false });

    delFromCarrito$ = createEffect(()=> this.actions$.pipe(
        ofType(CarritoCmd.removerDelCarrito),
        tap(async action=>{
            
            const conf = await this.msgCtrl.presentConfirm("Aceptar Para Continuar");
            if(!conf) return;

            const { id } = action;

            const load = await this.msgCtrl.loading();
            const resp = await Parse.Cloud.run("borrarDelCarrito", {id})
            .catch(error=> {
                load.dismiss();
                this.msgCtrl.presentToast(error);
            });
            await this.msgCtrl.presentToast(resp.msg);
            load.dismiss();
            this.store.dispatch(CarritoCmd.obtenerCarrito());
        })
    ), { dispatch: false });

    destroyCarrito$ = createEffect(()=> this.actions$.pipe(
        ofType(CarritoCmd.vaciarCarrito),
        tap(async ()=>{
            
            const conf = await this.msgCtrl.presentConfirm("Aceptar Para Continuar");
            if(!conf) return;
            const user = Parse.User.current();
            if(!user){
                this.router.navigate(['/tabs/profile']);
                return;
            }
            const load = await this.msgCtrl.loading();
            const resp = await Parse.Cloud.run("vaciarCarrito")
            .catch(error=> {
                load.dismiss();
                this.msgCtrl.presentToast(error);
            });

            if(!resp) return;

            await this.msgCtrl.presentToast(resp.msg);
            load.dismiss();
            this.store.dispatch(CarritoCmd.obtenerCarrito());
        })
    ), { dispatch: false });

    increment$ = createEffect(()=> this.actions$.pipe(
        ofType(CarritoCmd.increment),
        tap(async action=>{
            const load = await this.msgCtrl.loading();
            await Parse.Cloud.run("incrementCarrito", { carritoId: action.id})
            .catch(async error=>{ 
                await this.msgCtrl.presentToast(error);
                load.dismiss();
            });
            load.dismiss();
            this.store.dispatch(CarritoCmd.obtenerCarrito());
        })
    ), { dispatch: false })

    decrement$ = createEffect(()=> this.actions$.pipe(
        ofType(CarritoCmd.decrement),
        tap(async action=>{
            const load = await this.msgCtrl.loading();
            await Parse.Cloud.run("decrementCarrito", { carritoId: action.id})
            .catch(async error=>{ 
                await this.msgCtrl.presentToast(error);
                load.dismiss();
            });
            load.dismiss();
            this.store.dispatch(CarritoCmd.obtenerCarrito());
        })
    ), { dispatch: false })

    constructor(
        protected actions$: Actions,
        protected store: Store,
        protected router: Router,
        protected msgCtrl: MessagePort
    ) {}
}