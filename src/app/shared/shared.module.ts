import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryComponent } from './components/category/category.component';
import { IonicModule } from '@ionic/angular';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartCountComponent } from './components/cart-count/cart-count.component';
import { RouterModule } from '@angular/router';
import { ProductCartComponent } from './components/product-cart/product-cart.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressItemComponent } from './components/address-item/address-item.component';



@NgModule({
  declarations: [
    ProductItemComponent,
    ProductCardComponent,
    ProductCartComponent,
    BannerComponent,
    CategoryComponent,
    LoginComponent,
    SignupComponent,
    CartCountComponent,
    AddressItemComponent,
    AddressFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProductItemComponent,
    ProductCardComponent,
    ProductCartComponent,
    BannerComponent,
    CategoryComponent,
    CartCountComponent,
    LoginComponent,
    SignupComponent,
    AddressItemComponent,
    AddressFormComponent,
  ]
})
export class SharedModule { }
