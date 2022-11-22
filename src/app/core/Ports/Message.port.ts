

export abstract class MessagePort {
    abstract loading(): Promise<HTMLIonLoadingElement>
    abstract presentConfirm(message: string): Promise<boolean>;
    abstract presentAlert(message: string): Promise<void>;
    abstract presentToast(message: string): Promise<void>;
}