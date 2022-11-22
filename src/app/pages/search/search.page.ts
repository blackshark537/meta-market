import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductCmd } from 'src/app/core/Commands';
import { Product, AppState } from '../../core/Domain/Entities';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  protected products$: Observable<Product[]>;
  protected searchTerm: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    protected store: Store<AppState>
  ) { 
    this.products$ = store.select('productos');
  }

  ngOnInit() {
    const query = this.activatedRoute.snapshot.queryParamMap.get('q');
    const category = this.activatedRoute.snapshot.queryParamMap.get('categoryId') as string;
    this.search({value: query}, category);
  }

  search(target: any, category?: string){
    
    this.router.navigate([],{
        relativeTo: this.activatedRoute,
        queryParams: {
          q: target.value,
          category
        }, 
        queryParamsHandling: 'merge',
    });

    if(category){
      this.store.dispatch(ProductCmd.buscarPorCategoria({categoria: category }));
    }
    else if(target.value)
    {
      this.searchTerm = target.value;
      this.store.dispatch(ProductCmd.buscar({nombre: target.value }));
    }
  }

  clear(): void {
      this.store.dispatch(ProductCmd.limpiarBusqueda());
  }

}
