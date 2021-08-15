import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountData } from '../models/account-data.model';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API = 'http://localhost:8080/email_client/account';

  constructor(private http: HttpClient) { }

  public fetchAccounts() : Observable<any> {
    // /fetch'
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get<any>(this.API + '/fetch', { headers })
    .pipe(map((res: any) => {

      
      return res;

    }), catchError(error => {
      if (error.status === 400) {
        return Observable.throw('Illegal');
      }
      else {
        return Observable.throw(error.json().error || 'Server error');
      }
    }));

    //DUMMY DATA
    // return [{id : 1, address : 'my@gmail1.com'},
    //        {id : 2, address : 'my@gmail2.com'},
    //        {id : 3, address : 'my@gmail3.com'}] 

  };

  public createAccount(account : AccountData) : Observable<any>{
    // /create
    //TODO -> post request to send data for new AccountData and get ID of that newly created Account

    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.API + '/create', account, { headers })
    .pipe(map((res: any) => {

      return res;

    }), catchError(error => {
      if (error.status === 400) {
        return Observable.throw('Illegal');
      }
      else {
        return Observable.throw(error.json().error || 'Server error');
      }
    }));
  }
  
  public refreshAccounts() : Observable<any>{

  //  var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'text/plain' });

    return this.http.get(this.API + '/refresh', { responseType: 'text' })
    .pipe(map((res: any) => {

      return res;

    }), catchError(error => {
      if (error.status === 400) {
        return Observable.throw('Illegal');
      }
      else {
        return Observable.throw(error.json().error() || 'Server error');
      }
    }));
  }

}
