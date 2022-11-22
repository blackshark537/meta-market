import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SessionCmd } from 'src/app/core/Commands';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  
  protected signupForm: FormGroup;

  constructor(
    protected readonly fb: FormBuilder,
    protected readonly store: Store,
  ) { 
    this.signupForm = fb.group({
      username: [null, [Validators.required, Validators.maxLength(127)]],
      password: [null, [Validators.required, Validators.maxLength(127)]],
      phone: [null, [Validators.required, Validators.maxLength(10)]],
      email: [null, [Validators.required, Validators.maxLength(127), Validators.email]]
    });
  }

  async submit()
  {
    const {
      username,
      password,
      phone,
      email
    } = this.signupForm.value;
    this.store.dispatch(SessionCmd.Signup({
      user:{
        username,
        password,
        phone,
        email
      }
    }))
  }
}
