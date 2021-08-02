
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IdRequest } from '../models/IdRequest';
import { Message } from '../models/message.model';
import { NewMessage } from '../models/new-message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly url = "http://localhost:8080/newMessage";

  constructor(private httpClient: HttpClient) { }


  public fetchMessages(folderId: Number) : Message[] {

    //TODO get request for fetching messages
    return [

      {id: 2, subject: 'a',content: "some asfpafmspamfsp content...", from: "moj mejl @gmail.com", to: ["saljemPrvom@gmail.com", "saljemDrugom@gmail.com"], 
      cc : ["saljemPrvom@gmail.com", "saljemDrugom@gmail.com"], bcc: ["saljemPrvom@gmail.com", "saljemDrugom@gmail.com"],
      read: false, received: "1627311849526", sent: "1627311849526",
      attachments: [{id: 1, url: "www.google.com", title: "some attach title1"}]},
  
      {id: 1, subject: 'bb',content: "some asfpafmspamfsp content...", from: "moj mejl @gmail.com", to: ["saljemPrvom@gmail.com", "saljemDrugom@gmail.com"], 
      cc : ["saljemPrvom@gmail.com", "saljemDrugom@gmail.com"], bcc: ["saljemPrvom@gmail.com", "saljemDrugom@gmail.com"],
      read: true, received: "1627311849526", sent: "1627311849526",
      attachments: [{id: 1, url: "www.google.com", title: "some attach title1"}]}

      
    ];
  }

  public setReadStatus(status: boolean, messageId: Number){
    //TODO -> put request to set 'currentMessage' status
  }

  public deleteMessage(messageId: Number){
    //TODO -> delete request for deleting message on server
  }

 

  public sendNewMessage(newMessage:FormData){ //, headers : {'Content-Type':undefined, 'Accept':'application/json'}
    var config = {
      headers : {
          'Content-Type': undefined
      }

  }
    return this.httpClient.post("http://localhost:8080/message/test", newMessage);
  }


  uploadFile(file: File): Observable<any> {

    const formData = new FormData();
    
    formData.append('file', file, 'file');
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    });
    //const options = { headers } : Observable<any>;
    
    return this.httpClient.post("http://localhost:8080/message/test", formData);
      
    }

    upload(formData: FormData): Observable<any> {
      return this.httpClient.post<any>(`http://localhost:8080/message/test`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }
    
}
