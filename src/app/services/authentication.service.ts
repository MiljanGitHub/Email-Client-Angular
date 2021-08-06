import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {

  private readonly API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{

    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(this.API + '/login', { username : username, password: password }, { headers })
    .pipe(map((res: any) => {

      let token = res && res['jwt'];
      if (token) {
        return res;
      } else {
        return '';
      }

    }), catchError(error => {
      if (error.status === 400) {
        return Observable.throw('Illegal login');
      }
      else {
        return Observable.throw(error.json().error || 'Server error');
      }
    }));

      
  }


  register(username: string, password: string, firstname: string, lastname: string) : Observable<any> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.API + "/register", { username : username, password : password, firstName: firstname, lastName: lastname}, {headers})
    .pipe(map((res: any) => {
      return res;

    }), catchError(error => {
      console.log("register response: " + error);
      if (error.status === 400) {
        return Observable.throw('Illegal login');
      }
      else {
        return Observable.throw(error.json().error || 'Server error');
      }
    
    }));

  }



}
