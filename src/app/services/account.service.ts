import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountData } from '../models/account-data.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly AUTH_API = 'http://localhost:8080/api/auth/accounts';

  constructor(private http: HttpClient) { }

  public fetchAccounts() : Account[] {

    return [{id : 1, address : 'my@gmail1.com'},
           {id : 2, address : 'my@gmail2.com'},
           {id : 3, address : 'my@gmail3.com'}
          ]

     
    //return this.http.get(this.AUTH_API);
  };

  public createAccount(account : AccountData) : Number{

    //TODO -> post request to send data for new AccountData and get ID of that newly created Account

    return 999;
  }
}
