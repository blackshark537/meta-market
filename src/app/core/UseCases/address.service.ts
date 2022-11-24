import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs";
import { AddressCmd } from "../Commands";
import * as Parse from "parse";
import { Address } from "../Domain/Entities/Address";
import { Store } from "@ngrx/store";
import { MessagePort } from '../Ports'

@Injectable()
export class AddressService {

    obtener$ = createEffect(()=> this.actions$.pipe(
        ofType(AddressCmd.obtener),
        tap(async ()=>{
            const load = await this.msgCtrl.loading();
            const query = new Parse.Query(Address);
            const addresses = await query.equalTo("user", Parse.User.current())
            .descending("principal")
            .find()
            .catch(error=> {
                load.dismiss();
                this.msgCtrl.presentToast(error);
            });
            load.dismiss();
            if(!addresses) return;
            this.store.dispatch(AddressCmd.establecer({addresses}));
        })
    ), { dispatch: false });

    agregar$ = createEffect(()=> this.actions$.pipe(
        ofType(AddressCmd.agregar),
        tap(async action=>{
            const user = Parse.User.current();
            if(!user) return;

            const load = await this.msgCtrl.loading();
            
            await Parse.Cloud.run("createDireccion", {...action.address})
            .catch(error=>{
                load.dismiss();
                this.msgCtrl.presentToast(error);
            });
            load.dismiss();
            this.store.dispatch(AddressCmd.obtener());
        })
    ), { dispatch: false})

    borrar$ = createEffect(()=> this.actions$.pipe(
        ofType(AddressCmd.borrar),
        tap(async action=>{
            const resp = await this.msgCtrl.presentConfirm("Confirmar para borrar");
            if(!resp) return;
            const load = await this.msgCtrl.loading();
            await action.address.destroy()
            .catch(error=> {
                load.dismiss();
                this.msgCtrl.presentToast(error);
            });
            load.dismiss();
            await this.msgCtrl.presentToast("Borrado con exito!");
            this.store.dispatch(AddressCmd.obtener());
        })
    ), { dispatch: false })

    makeItFirst = createEffect(()=> this.actions$.pipe(
        ofType(AddressCmd.hacerlaPrincipal),
        tap( async action=>{
            const address = action.address;
            const addressId = address.id;
            if(!addressId) return;

            const load = await this.msgCtrl.loading();
            const resp = await Parse.Cloud.run("direccionPrincipal", { addressId })
            .catch(error=>{
                load.dismiss();
                this.msgCtrl.presentToast(error);
            });
            load.dismiss();
            
            if(!resp) return;

            await this.msgCtrl.presentToast(resp.msg);
            this.store.dispatch(AddressCmd.obtener());
        })
    ), { dispatch: false });

    constructor(
        protected actions$: Actions,
        protected store: Store,
        protected msgCtrl: MessagePort
    ){}
}