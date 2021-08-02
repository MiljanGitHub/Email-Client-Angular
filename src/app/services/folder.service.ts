import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Folder } from '../models/folder.model';


@Injectable({
  providedIn: 'root'
})
export class FolderService {

  private readonly AUTH_API = 'http://localhost:8080/api/auth/folders';

  constructor(private http: HttpClient) { }

  public fetchFolders(accountId: Number) : Folder[] {

    //TODO -> real http request

    if (accountId == 1){
      return [{folderName : 'Inbox', id : 1, folders : []},
      {folderName : 'Draft', id : 2, folders : []},
      {folderName : 'Spam', id : 3, folders : []},
      {folderName : 'Trash', id : 4, folders : [
        {folderName : 'Trash lvl 1', id : 5, folders : [
          {folderName : 'Trash lvl 2', id : 6, folders: []}
        ]}
      ]}] ;
    } else if ( accountId == 2){
      return      [{folderName : 'Inbox', id : 7, folders : []},
      {folderName : 'Draft', id : 8, folders : []},
      {folderName : 'Spam', id : 9, folders : []},
      {folderName : 'Trash', id : 10, folders : []}
      ] ;
    } else if( accountId == 3){
      return [{folderName : 'Inbox', id : 11, folders : []}];
    }

    return [{folderName : 'Inbox', id : 12, folders : []},
    {folderName : 'Draft', id : 13, folders : []},
    {folderName : 'Spam', id : 14, folders : []},
    {folderName : 'Trash', id : 15, folders : [
      {folderName : 'Trash lvl 1', id : 16, folders : [
        {folderName : 'Trash lvl 2', id : 17, folders: []}
      ]}
    ]}] ;

     
    //return this.http.get(this.AUTH_API);
  };

  public deleteFolder(folderId: Number){
    //TODO 
  }
}
