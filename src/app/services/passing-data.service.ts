import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PassingDataService {

  private loginMode = new BehaviorSubject<boolean>(true);
  currentMode = this.loginMode.asObservable();

  constructor() { }

  changeMode(isLoginMode: boolean){
    this.loginMode.next(isLoginMode);
  }
}
