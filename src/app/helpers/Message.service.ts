import { Injectable } from "@angular/core";
import { AlertController, LoadingController, ToastController } from "@ionic/angular";
import { MessagePort } from '../core/Ports';

@Injectable({
    providedIn: 'root'
})
export class MessageService implements MessagePort{

    constructor(
        protected readonly toastCtrl: ToastController,
        protected readonly alertCtrl: AlertController,
        protected readonly loadCtrl: LoadingController
    ){}

    async loading(): Promise<HTMLIonLoadingElement>{
        const load = await this.loadCtrl.create({
            animated: true,
            spinner: "lines",
            backdropDismiss: false,
            mode: 'ios'
        });
        await load.present();
        return load;
    }

    async presentToast(message: string): Promise<void> {
        const toast = await this.toastCtrl.create({
            message,
            duration: 5000,
            mode: 'ios',
            animated: true,
            buttons:[
                {
                    icon: "close",
                    role: "cancel"
                }
            ]
        });
        await toast.present();
    }

    async presentAlert(message: string): Promise<void> {
        const alrt = await this.alertCtrl.create({
            header: "Info",
            message,
            mode: 'ios',
            animated: true,
            buttons:[
                {
                    text: "Ok",
                    role: "cancel"
                }
            ]
        });

        await alrt.present();
    }

    async presentConfirm(message: string): Promise<boolean> {
        let resp = false;
        const alrt = await this.alertCtrl.create({
            header: "Confirmar!",
            message,
            mode: 'ios',
            animated: true,
            buttons:[
                {
                    role: 'cancel',
                    text: "Cancelar"
                },
                {
                    text: "Aceptar",
                    handler: ()=> resp= true
                }
            ]
        });
        await alrt.present();
        await alrt.onDidDismiss();
        return resp;
    }
}