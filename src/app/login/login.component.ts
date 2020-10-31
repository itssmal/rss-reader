import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../core/services/login.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import * as fromApp from '../app.reducer'
import * as LoginActions from '../login/login.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading = false
  public errorMessage: string
  private storeSub: Subscription

  public loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // @ts-ignore
    this.store.select('login').subscribe(loginState => {
      console.log(loginState)
      this.isLoading = loginState.isLoading
      this.errorMessage = loginState.authError
    })
  }

  public async login(): Promise<void> {
    // console.log(this.store.dispatch(LoginActions.loginStart({username: this.username.value, password: this.password.value})))
    this.store.dispatch(LoginActions.loginStart({username: this.username.value, password: this.password.value}));
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
