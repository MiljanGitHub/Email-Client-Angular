import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {

  private readonly AUTH_API = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<string>{

    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    //Simulate the login endpoint
    console.log("abcdefghjkl")
    return of("abcdefghjkl");

    //real http request; should be tested
  //   return this.http.post<string>(this.AUTH_API + 'login', JSON.stringify({ username, password }), { headers })
  //   .pipe(map((res: any) => {
      
  //     let token = res && res['token'];
  //     if (token) {
  //       return res['token'];
  //     } else {
  //       return '';
  //     }

  //   }), catchError(error => {
  //     if (error.status === 400) {
  //       return Observable.throw('Illegal login');
  //     }
  //     else {
  //       return Observable.throw(error.json().error || 'Server error');
  //     }
  // }));

      
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      //// TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
