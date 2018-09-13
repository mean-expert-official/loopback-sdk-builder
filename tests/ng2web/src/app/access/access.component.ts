import { Component, OnInit } from '@angular/core';
import { Account, AccessToken } from '../shared/sdk/models';
import { AccountApi } from '../shared/sdk/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
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

export class AccessComponent implements OnInit {

  public account: Account = new Account();
  public rememberMe: boolean = false;

  constructor(
    private accountApi: AccountApi,
    private router: Router
  ) { }

  ngOnInit() {}

  register() {
    this.accountApi.create(this.account).subscribe((account: Account) => this.login());
  }

  login() {
    this.accountApi.login(this.account, 'user', this.rememberMe).subscribe((token: AccessToken) =>
      this.router.navigate(['/home'])
    );
  }
}
