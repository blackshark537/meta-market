import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Parse from 'parse';
import { SessionCmd } from 'src/app/core/Commands';
import { User } from 'src/app/core/Domain/Entities/User';
import { iUser } from 'src/app/core/Domain/Interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  protected user: User;
  protected userAttr?: iUser;

  constructor(
    protected readonly router: Router,
    protected readonly store: Store,
  ) { 
    this.user = Parse.User.current() as User;
    if(this.user)
      this.userAttr = this.user.attributes as iUser;
  }

  async logout()
  {
    this.store.dispatch(SessionCmd.Logout());
  }

}
