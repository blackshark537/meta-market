import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AddressCmd } from 'src/app/core/Commands';
import { Address } from 'src/app/core/Domain/Entities';
import { iAddress } from 'src/app/core/Domain/Interfaces';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss'],
})
export class AddressItemComponent implements iAddress {
  
  @Input("address") address?: Address;
  @Input("chequed") chequed = false;
  protected attr: any;

  constructor(
    protected modalCtrl: ModalController,
    protected store: Store
  ) { }

  ngOnInit() {
    this.attr = this.address?.attributes;
  }

  get nombre(): string{
    return this.attr.nombre;
  }

  get direccion(): string{
    return this.attr.direccion;
  }

  get piso(): string{
    return this.attr.piso;
  }

  get indicaciones(): string{
    return this.attr.indicaciones;
  }

  get principal(): boolean{
    return this.attr.principal;
  }

  get color(): "primary" | "light" {
    return this.principal? 'primary' : 'light';
  }

  remove()
  {
    if(!this.address) return;
    this.store.dispatch(AddressCmd.borrar({address: this.address}))
  }

  makePrincipal(target: any)
  {
    this.address?.set("principal", target.value);
    console.log(this.address?.attributes, target.value);
  }

  async open()
  {
    const modal = await this.modalCtrl.create({
      component: AddressFormComponent,
      componentProps: {
        address: this.attr
      },
      backdropDismiss: false,
      animated: true,
      mode: 'ios'
    });

    await modal.present();
    await modal.onDidDismiss();
  }
}
