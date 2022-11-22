import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { BannerCmd } from "../Commands";
import { Banner } from "../Domain/Entities";
import * as Parse from 'parse';

@Injectable()
export class BannerService {

    getBanners$ = createEffect(()=> this.actions$.pipe(
        ofType(BannerCmd.todos),
        tap(async ()=>{
            const bannerQuery = new Parse.Query(Banner);
            const banners = await bannerQuery.findAll();
            this.store.dispatch(BannerCmd.establecer({banners}))
        })
    ), { dispatch: false })

    constructor(
        protected actions$: Actions,
        protected store: Store
    ) {}
}