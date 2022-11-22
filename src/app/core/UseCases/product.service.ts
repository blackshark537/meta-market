import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { ProductCmd } from "../Commands";
import { Category, Product } from "../Domain/Entities";
import { MessagePort } from '../Ports'
import * as Parse from 'parse';


@Injectable()
export class ProductService {

    enDescuento$ = createEffect(()=> this.actions$.pipe(
        ofType(ProductCmd.enDescuento),
        tap(async ()=>{
            const productQuery = new Parse.Query(Product.extend("Productos"));
            const productos = await productQuery.equalTo("en_oferta", true).findAll();
            this.store.dispatch(ProductCmd.establecerDescuento({productos}));
        })
    ), { dispatch: false});

    buscar$ = createEffect(()=> this.actions$.pipe(
        ofType(ProductCmd.buscar),
        tap(async action=>{
            const load = await this.msgCtrl.loading();
            const productQuery = new Parse.Query(Product.extend("Productos"));
            const productos = await productQuery.fullText("nombre", action.nombre).findAll();
            load.dismiss();
            this.store.dispatch(ProductCmd.establecer({productos}));
            await Parse.Analytics.track("Busquedas", {
                nombre: action.nombre
            });
        })
    ), { dispatch: false});

    buscarPorId$ = createEffect(()=> this.actions$.pipe(
        ofType(ProductCmd.buscarPorId),
        tap(async action=>{
            const load = await this.msgCtrl.loading();
            const productQuery = new Parse.Query(Product.extend("Productos"));
            const productos = await productQuery.equalTo("objectId", action.id).find();
            load.dismiss();
            this.store.dispatch(ProductCmd.establecerUno({producto: productos}))
        })
    ), { dispatch: false});

    buscarPorCategoria$ = createEffect(()=> this.actions$.pipe(
        ofType(ProductCmd.buscarPorCategoria),
        tap(async action=>{
            const { categoria } = action;
            const load = await this.msgCtrl.loading();
            const categoryQuery = new Parse.Query(Category);
            const categoryObject = await categoryQuery.equalTo("objectId", categoria).find();
            const relation = categoryObject[0]?.relation("productos");
            const productos = await relation?.query().findAll() as Product[];
            load.dismiss();
            this.store.dispatch(ProductCmd.establecer({productos}));
        })
    ), { dispatch: false});

    meGusta$ = createEffect(()=> this.actions$.pipe(
        ofType(ProductCmd.meGusta),
        tap(async action=>{
            const { productoId } = action;
            const load = await this.msgCtrl.loading();
            const resp = await Parse.Cloud.run("Like", {productoId});
            load.dismiss();
            await this.msgCtrl.presentToast(resp.msg);
        })
    ), {dispatch: false});

    constructor(
        protected actions$: Actions,
        protected store: Store,
        protected msgCtrl: MessagePort
    ) {}
}