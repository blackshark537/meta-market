import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { SessionCmd } from "../Commands";
import { MessagePort } from "../Ports";
import * as Parse from "parse";


@Injectable()
export class SessionService {

    signup = createEffect(()=> this.actions$.pipe(
        ofType(SessionCmd.Signup),
        tap(async action=>{
            const load = await this.messagePort.loading();
            const resp = await Parse.Cloud.run("userSignup", {...action.user})
            .catch(error=> {
                load.dismiss();
                this.messagePort.presentToast(error);
            });
            if(resp){
                load.dismiss();
                this.messagePort.presentToast(resp.msg);
                this.router.navigate(['/tabs/profile']);
            }
        })
    ), { dispatch: false });

    login$ = createEffect(()=> this.actions$.pipe(
        ofType(SessionCmd.Login),
        tap(async action=>{
            const { username, password } = action;
            const load = await this.messagePort.loading();
            const resp = await Parse.User.logIn(username, password)
            .catch(error=> {
                load.dismiss();
                this.messagePort.presentToast(error);
            });

            if(resp){
                load.dismiss();
              this.router.navigate(['/tabs/profile']);
            }
            
        })
    ), { dispatch: false });

    logout$ = createEffect(()=> this.actions$.pipe(
        ofType(SessionCmd.Logout),
        tap(async () => {
            const resp = await this.messagePort.presentConfirm("Aceptar Para Salir");
            if(!resp) return;
            const load = await this.messagePort.loading();
            await Parse.User.logOut();
            this.router.navigate(['/']);
            load.dismiss();
        })
    ), { dispatch: false });

    constructor(
        protected actions$: Actions,
        protected store: Store,
        protected messagePort: MessagePort,
        protected router: Router
    ) {}
}