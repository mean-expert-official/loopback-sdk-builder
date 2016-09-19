import { Component, OnInit } from '@angular/core';
import { Account, AccessToken } from '../shared/sdk/models';
import { AccountApi } from '../shared/sdk/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access',
  templateUrl: 'access.component.html'
})

export class AccessComponent implements OnInit {

  private account: Account = new Account();
  private rememberMe: boolean = false;

  constructor(
    private accountApi: AccountApi,
    private router: Router
  ) { }

  ngOnInit() { }

  register() {
    this.accountApi.create(this.account).subscribe((account: Account) => this.login());
  }

  login() {
    this.accountApi.login(this.account, 'user', this.rememberMe).subscribe((token: AccessToken) =>
      this.router.navigate(['/room'])
    );
  }
}
