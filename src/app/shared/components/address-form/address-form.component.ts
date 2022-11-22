import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AddressCmd } from 'src/app/core/Commands';
import { Address } from 'src/app/core/Domain/Entities';
import { iAddress } from 'src/app/core/Domain/Interfaces';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  @Input("address") address?: iAddress;

  addressForm: FormGroup;

  constructor(
    protected modalCtrl: ModalController,
    protected store: Store,
    protected fb: FormBuilder
  ) { 
    this.addressForm = fb.group({
      direccion: [null, [Validators.required, Validators.maxLength(255)]],
      piso: [null, [Validators.required, Validators.maxLength(127)]],
      indicaciones: [null, [Validators.required, Validators.maxLength(127)]],
      principal: [false],
      nombre: [null, [Validators.required, Validators.maxLength(127)]],
    })
  }

  ngOnInit() {
    if(this.address){
      this.addressForm.patchValue({...this.address});
    }
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  save()
  {
    this.store.dispatch(AddressCmd.agregar({address: this.addressForm.value}));
    this.dismiss();
  }
}
