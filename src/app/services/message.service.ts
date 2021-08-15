
import { S } from '@angular/cdk/keycodes';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IdRequest } from '../models/IdRequest';
import { Message } from '../models/message.model';
import { NewMessage } from '../models/new-message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly API = "http://localhost:8080/email_client/message";

  constructor(private httpClient: HttpClient) { }


  public fetchMessages(folderId: Number) : Observable<Message[]> {

    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    //TODO get request for fetching messages

    return this.httpClient.get(this.API + "/fetch/" + folderId, { headers })
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

  public setReadStatus(status: boolean, messageId: Number): Observable<any>{
    //TODO -> put request to set 'currentMessage' status
    //let params = new HttpParams()
    //.set('status', 'true')
    //params.append('status', 'true');

    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
   // console.log(this.API + "/setStatus/" + messageId)
    return this.httpClient.put<any>(this.API + "/setStatus", { status : status , messageId : messageId}, {headers})
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

  public deleteMessage(messageId: Number) : Observable<any>{
    //TODO -> delete request for deleting message on server

    var headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.delete(this.API + "/delete/" + messageId, {headers})
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


  public sendNewMessageWithAttachments(formData: FormData): Observable<any> {
      return this.httpClient.post<any>(this.API + `/initWithAttachments`, formData, {
        reportProgress: true,
        observe: 'events'
      });
  }

  public sendNewMessageWithoutAttachments(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.API + `/initWithoutAttachments`, formData, {
      reportProgress: true,
      observe: 'events'
    });
}
    
}
