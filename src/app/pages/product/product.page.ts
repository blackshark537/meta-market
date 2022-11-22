import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CarritoCmd, ProductCmd } from 'src/app/core/Commands';
import { AppState, Product } from 'src/app/core/Domain/Entities';
import { iProduct } from 'src/app/core/Domain/Interfaces';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  protected product: Product | undefined;
  protected loaded: boolean = false;
  protected qty: number = 1;
  constructor(
    protected readonly meta: Meta,
    protected readonly store: Store<AppState>,
    protected readonly activatedRoute: ActivatedRoute,
  ) {

  }

  async ngOnInit() {
    this.store.select('elegido').subscribe(product => {
      if (!product?.length){ 
        const id = this.activatedRoute.snapshot.queryParamMap.get('id') as string;
        this.store.dispatch(ProductCmd.buscarPorId({ id }));
        return;
      }
      this.product = product[0];
      this.loaded = true;
      this.setMetaTags();
      this.store.dispatch(CarritoCmd.obtenerCarrito());
    });
  }

  setMetaTags() {
    this.meta.addTags([
      {
        name: "og:title",
        content: environment.appName
      },
      {
        name: "og:description",
        content: (this.product?.attributes as iProduct).nombre
      },
      {
        name: "og:image",
        content: (this.product?.attributes as iProduct).foto
      }
    ]);
  }

  increment() {
    this.qty += 1
  }

  decrement() {
    if (this.qty > 1) this.qty -= 1;
  }

  async share() {

    const { nombre } = this.product?.attributes as iProduct;
    const payload = {
      title: "Compartir producto",
      text: nombre,
      url: location.href
    }

    try {
      await navigator.share(payload);
    } catch (error) {
      console.log(error);
    }
  }

  async addToCart() {
    if (!this.product?.id) return;
    this.store.dispatch(CarritoCmd.agregarAlCarrito({
      productoId: this.product.id,
      qty: this.qty,
    }));
  }
}
