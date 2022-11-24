import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { CategoryCmd } from "../Commands";
import { Category } from "../Domain/Entities";
import * as Parse from 'parse';

@Injectable()
export class CategoryService {

    getCategories$ = createEffect(()=> this.actions$.pipe(
        ofType(CategoryCmd.todas),
        tap(async ()=>{
            const catQuery = new Parse.Query(Category);
            const categories = await catQuery.findAll();
            this.store.dispatch(CategoryCmd.establecer({categories}))
        })
    ), { dispatch: false });

    constructor(
        protected actions$: Actions,
        protected store: Store
    ) {}
}