import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddressCmd } from 'src/app/core/Commands';
import { AppState, Address } from 'src/app/core/Domain/Entities';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  protected addresses$?: Observable<Address[] | undefined>
  protected openModal = false;
  
  constructor(
    protected store: Store<AppState>
  ) { }

  ngOnInit() {
    this.addresses$ = this.store.select('direcciones');
    this.store.dispatch(AddressCmd.obtener());
  }

}
