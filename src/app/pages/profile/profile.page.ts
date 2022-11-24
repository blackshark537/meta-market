import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Parse from 'parse';
import { Observable } from 'rxjs';
import { CarritoCmd, SessionCmd } from 'src/app/core/Commands';
import { AppState, Carrito } from 'src/app/core/Domain/Entities';
import { User } from 'src/app/core/Domain/Entities/User';
import { iUser } from 'src/app/core/Domain/Interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit{
  protected userAttr?: iUser;
  protected user: User;
  protected carrito$: Observable<Carrito[]>

  constructor(
    protected readonly router: Router,
    protected readonly store: Store<AppState>,
  ) { 
    this.carrito$ = store.select("carrito");
    this.user = Parse.User.current() as User;
    if(this.user)
      this.userAttr = this.user.attributes as iUser;
  }

  ngOnInit(): void {
    this.store.dispatch(CarritoCmd.obtenerCarrito());
  }

  async logout()
  {
    this.store.dispatch(SessionCmd.Logout());
  }

}
