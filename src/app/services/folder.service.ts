import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from '../models/account.model';
import { Folder } from '../models/folder.model';


@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private readonly API = 'http://localhost:8080/email_client/folder';

  constructor(private http: HttpClient) { }

  public fetchFolders(accountId: Number) : Observable<Folder[]> {
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    //TODO -> real http request

    return  this.http.get<any>(this.API + "/fetch/" + accountId, {headers})
    .pipe(map((res: any) => {

      return res;

    }), catchError(error => {
      
      if (error.status === 400) {
        return Observable.throw('Illegal login');
      }
      else {
        return Observable.throw(error.json().error || 'Server error');
      }
    
    }));

  };

  public deleteFolder(folderId: Number): Observable<any>{
    //TODO 
    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    //TODO -> real http request

   return this.http.delete(this.API + "/delete/" + folderId, {headers})
    .pipe(map((res: any) => {

      return res;

    }), catchError(error => {
      
      if (error.status === 400) {
        return Observable.throw('Illegal login');
      }
      else {
        return Observable.throw(error.json().error || 'Server error');
      }
    
    }));
  }
}
