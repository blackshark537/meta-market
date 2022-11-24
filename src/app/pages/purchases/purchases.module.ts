import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchasesPageRoutingModule } from './purchases-routing.module';

import { PurchasesPage } from './purchases.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    PurchasesPageRoutingModule
  ],
  declarations: [PurchasesPage]
})
export class PurchasesPageModule {}
