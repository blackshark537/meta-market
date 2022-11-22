import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Parse from 'parse';
import { SessionCmd } from 'src/app/core/Commands';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  protected loginForm: FormGroup;

  constructor(
    protected readonly fb: FormBuilder,
    protected readonly store: Store,
  ) { 
    this.loginForm = fb.group({
      username: [null, [Validators.required, Validators.maxLength(127)]],
      password: [null, [Validators.required, Validators.maxLength(127)]]
    })
  }

  async submit()
  {
    const { username, password } = this.loginForm.value;
    this.store.dispatch(SessionCmd.Login({username, password}));
  }

}
