import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { of } from 'rxjs';
import { AccountData } from 'src/app/models/account-data.model';
import { Account } from 'src/app/models/account.model';
import { Folder } from 'src/app/models/folder.model';
import { Message } from 'src/app/models/message.model';
import { AccountService } from 'src/app/services/account.service';
import { FolderService } from 'src/app/services/folder.service';
import { MessageService } from 'src/app/services/message.service';
import { PassingDataService } from 'src/app/services/passing-data.service';
import { AppConstants } from 'src/app/utils/app-constants';
import {COMMA, ENTER, SPACE, SEMICOLON} from '@angular/cdk/keycodes';
import { Attachment } from 'src/app/models/attachment.model';
import { NewMessage } from 'src/app/models/new-message';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public separatorKeysCodes: number[] = [ENTER, COMMA, SPACE, SEMICOLON];

  public removable = true; //setting mat-chips as 'removable'

  public accounts: Account[] = [];
  public currentAccount: Account;

  public folders: Folder[] = [];
  public currentFolder: Folder;

  //property for Telerik control to unselect Folder on the UI if Account is changed
  public isFolderSelected: Boolean; 
  
  public messages: Message[] = [];
  public currentMessage = new Message(-1, '', '', '', [], [], [], true, '', '', []); //defaul new Message
  public selectedMessage : Message;
  //table column header title; for 'Messages' tab table
  public displayedColumns: string[] = ['Subject', 'From', 'To', 'Content','Read','Attachment', 'Received', 'Sent']
  
  public newAccountForm: FormGroup;
  public messageViewForm: FormGroup;
  public messageNewForm: FormGroup;
 
  public toAddressCtrl = new FormControl();
  public ccAddressCtrl = new FormControl();
  public bccAddressCtrl = new FormControl();

  @ViewChild('toAddressInput') toAddressInput: ElementRef<HTMLInputElement>;
  @ViewChild('ccAddressInput') ccAddressInput: ElementRef<HTMLInputElement>;
  @ViewChild('bccAddressInput') bccAddressInput: ElementRef<HTMLInputElement>;

  constructor(private accountService : AccountService, 
              private folderService : FolderService,
              private messageService : MessageService,
              private passingDataService : PassingDataService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.accounts = this.accountService.fetchAccounts();
    this.newAccountForm = this.fb.group({
      displayName: [''],
      username: ['', [Validators.required, Validators.pattern(AppConstants.EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      smtpAddress: [''],
      smtpPort: [''],
      imapAddress: [''],
      imapPort: [''],
      incomingType: ['']
    })

    //TODO -> extract data when sending new Message
    this.messageNewForm = this.fb.group({
      messageNewSubject: [''],
      messageNewContent: ['']
    })

  }

  submitForm() {
    
    let accountData = new AccountData(
      -1,
      this.newAccountForm.get('displayName').value,
      this.newAccountForm.get('username').value,
      this.newAccountForm.get('password').value,
      this.newAccountForm.get('smtpAddress').value,
      this.newAccountForm.get('smtpPort').value,
      this.newAccountForm.get('imapAddress').value,
      this.newAccountForm.get('imapPort').value,
      this.newAccountForm.get('incomingType').value
    )
    
    //TODO -> check if real http post will work to add newly create Account
    let idAccount = this.accountService.createAccount(accountData);

    this.accounts.push(new Account(accountData.username, idAccount));

    //to reset the form data, optional
    //this.myForm.reset();
  }


  onClickedCurrentAccount(){

    //when Account is changed (bi-directional mapping from view-code works, so currentAccount is already selected)
    this.folders = [];
    this.folders = this.folderService.fetchFolders(this.currentAccount.id);

    //if 'messages' are existing reset them to default
    if (this.messages.length > 0) this.messages = [];

    //if 'currentFolder' has been already selected, reset it to null and deselect it on the UI using 'isFolderSelected' property
    if (this.currentFolder != null || this.currentFolder != undefined) {
        this.isFolderSelected = false;
        this.currentFolder = null;
        //only for debuging purposes
        //console.log("u onClickedCurrentAccount -> prethodni folder je: " + this.currentFolder.folderName + " " + this.currentFolder.id + " " + "sad ga setujemo na null")
    }
    
  }

  onClickedCurrentFolder(){
   
  }

  public hasChildren = (folder: any) => folder.folders && folder.folders.length > 0;
  public fetchChildren = (folder: any) => of(folder.folders);
  
  public handleSelection( {index} : any): void {

    //this.currentMessage = new Message(-1, '', '', '', [], [], [], true, '', '', []); //defaul new Message
    let ids = index.split('_');

    const folders = this.folders;

    var targetFolder = ids.reduce((foldersAccumulator, currentId) => foldersAccumulator.folders[currentId] , {folders})
    
    this.currentFolder = targetFolder;

    if ((this.currentAccount != null && this.currentAccount != undefined)){
      //TODO -> real http request
      this.messages = this.messageService.fetchMessages(this.currentFolder.id);
    }

    //only for debuging purposes
    // if (this.currentFolder != undefined && this.currentFolder != null){
    //   console.log("(handleSelection()) printing currentFolder: " + this.currentFolder.folderName + " " + this.currentFolder.id);    
    // }
      
  }

  deleteCurrentlySelectedFolder(){

    //recursivly remove currentFolder from list of folders
    this.callRemove(this.folders, this.currentFolder.id);

    //set currentFolder to null
    let folderId = this.currentFolder.id;
    this.currentFolder = null;

    //if 'messages' and/or 'selectedMessage' are existing reset them to default
    if (this.messages.length > 0) this.messages = [];
    if (this.selectedMessage != null) this.selectedMessage = null;

    //TODO make folder service request to delete Folder on Backend
    this.folderService.deleteFolder(folderId);
  };

  public onRowClick(selectedMessage: Message){
    //when row (i.e. Message) in the 'Messages' tab is clicked
    this.selectedMessage = selectedMessage;

    if (this.currentAccount != null && this.currentFolder != null){
      //by opening 'selectedMessage' we set it as 'read' => 'true' on Backend
      this.selectedMessage.read = true; //set 'read' status as 'true' on the UI
      this.messageService.setReadStatus(true,this.selectedMessage.id);

      //seting all 'readonly' values on the UI
      this.messageViewForm = this.fb.group({
        messageViewSubject: [this.selectedMessage.subject],
        messageViewTo: [this.selectedMessage.to],
        messageViewFrom: [this.selectedMessage.from],
        messageViewCc: [this.selectedMessage.cc],
        messageViewBcc: [this.selectedMessage.bcc],
        messageViewContent: [this.selectedMessage.content],
        //messageViewAttachment: [this.currentMessage.attachments]
      })
    }

  }

  onClickDelete(){

    var currentSelectedMessageIndex = this.messages.indexOf(this.selectedMessage);
    var newMessagesList = this.messages.filter((m, i) => i != currentSelectedMessageIndex);
    //mat-table needs new dataSource to be set after removal has occured (i.e once we removed selected row);
    //the immutability is in the game: the mat-table after it is intialized only listens to the datasource reference
    this.messages = newMessagesList;

    let messageId = this.selectedMessage.id;
    this.selectedMessage = null;

    //TODO
    this.messageService.deleteMessage(messageId);
  }

  onClicDismiss(){
    console.log("dissmis current new message and set it back to default")
    this.currentMessage = new Message(-1, '', '', '', [], [], [], true, '', '', []); //reset to defaul new Message
    
  
  }

  onClickedFromAccount(account){
    //After selecting 'from' Account, currentMessage's 'from' address is being set
    this.currentMessage.from = account.address;
  }

  private callRemove(folders: Folder[], id: Number) {

    for(let i = 0; i < folders.length; i++){
      let f = folders[i];
      if (f.id == id) folders.splice(i, 1);
      else this.callRemove(f.folders, id);
    }

  }

  removeToAddress(toAddress: string): void {
    const index = this.currentMessage.to.indexOf(toAddress);
    if (index >= 0) this.currentMessage.to.splice(index, 1);
  }

  addToAddress(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const input = event.input;
    
    if (value) this.currentMessage.to.push(value)
    
    if (input) input.value = ''

  }

  
  
  removeCcAddress(ccAddress: string): void {
    const index = this.currentMessage.cc.indexOf(ccAddress);
    if (index >= 0) this.currentMessage.cc.splice(index, 1);
  }

  addCcAddress(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const input = event.input;
    
    if (value) this.currentMessage.cc.push(value)
    
    if (input) input.value = ''

  }

  removeBccAddress(bccAddress: string): void {
    const index = this.currentMessage.bcc.indexOf(bccAddress);
    if (index >= 0) this.currentMessage.bcc.splice(index, 1);
  }

  addBccAddress(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    const input = event.input;
    
    if (value) this.currentMessage.bcc.push(value)
    
    if (input) input.value = ''

  }
  /////////////////////////////////////////////
  public attachments: Attachment[] = [];
  public selectedFiles: File[] = []
  public selectedFile: File;



  onFilesSelected(event){



    this.selectedFiles.push(<File>event.target.files[0])
    
    //this.selectedFiles = <File[]>event.target.files;
    this.selectedFile = event.target.files[0];

    var fd = new FormData();


    console.log(this.selectedFile);
   
    fd.append('files',this.selectedFile, this.selectedFile.name);
   
    fd.append("idRequest", JSON.stringify({messageId : -1}));
    

    this.messageService.upload(fd).subscribe(
      event => {
        console.log(event);
        //this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    
  }

  







  onClicSendMessage(){
    //TODO
  }

 

}
