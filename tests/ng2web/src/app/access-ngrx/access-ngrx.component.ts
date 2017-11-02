import { Component, OnInit } from '@angular/core';
import { Account, AccessToken } from '../shared/sdk/models';
import { AccountApi } from '../shared/sdk/services';

import { Orm } from '../shared/sdk/orm';

@Component({
  selector: 'app-access-ngrx',
  template: `
  <h1>Register or Log In an Account</h1>
  <form>
    <input name="email" type="email" [(ngModel)]="account.email" placeholder="email" />
    <input name="password" type="password" [(ngModel)]="account.password" placeholder="password" />
    <label for="rememberMe">Remember Me:</label>
    <input name="rememberMe" type="checkbox" [(ngModel)]="rememberMe"/>
    <button (click)="register()">Register</button> or <button (click)="login()">Log In</button>
  </form>
`
})

export class AccessNgrxComponent implements OnInit {

  public account: Account = new Account();
  public rememberMe: boolean = false;

  constructor(private orm: Orm) { }

  ngOnInit() {}

  register() {
    this.orm.Account.signup(this.account);
  }

  login() {
    this.orm.Account.login(this.account, 'user', this.rememberMe);
  }
}
