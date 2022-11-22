import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BannerCmd, CarritoCmd, CategoryCmd, ProductCmd } from 'src/app/core/Commands';
import Swiper, { Autoplay, SwiperOptions } from 'swiper';
import { Banner, Category, Product, AppState } from '../../core/Domain/Entities';

Swiper.use([Autoplay]);

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: true,
    speed: 100,
    autoplay: {
      delay: 1000,
    },
    loop: true,
  };

  categories$: Observable<Category[]>;
  banners$: Observable<Banner[]>;
  products$: Observable<Product[]>;

  protected swiperIndex = 0;

  constructor(
    protected readonly router: Router,
    protected readonly store: Store<AppState>
  ) { 
    this.categories$ = this.store.select('categorias');
    this.products$ = this.store.select('descuentos');
    this.banners$ = this.store.select('banners');
  }

  async ngOnInit() {
    this.store.dispatch(CategoryCmd.todas());
    this.store.dispatch(ProductCmd.enDescuento());
    this.store.dispatch(BannerCmd.todos());
    this.store.dispatch(CarritoCmd.obtenerCarrito());
  }

  openCategory(category: Category) {
    this.router.navigate(['/search'],{
      queryParams: {
        categoryId: category.id
      }
    });
  }

}

