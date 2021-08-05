import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service'
import { PassingDataService } from 'src/app/services/passing-data.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  hide = true;

  public user:any;
  
  public wrongUsernameOrPass:boolean;

  public loginMode: boolean; //to open component in login or register mode

  constructor(private authenticationService:AuthenticationService, 
              private tokenService: TokenStorageService, 
              private router: Router,
              private passingDataService : PassingDataService) {
    

    this.user = {};
    this.wrongUsernameOrPass = false;
    
  }

  ngOnInit(): void {
    this.passingDataService.currentMode.subscribe(isLoginMode => this.loginMode = isLoginMode);
  }

  
  loginOrRegister():void{ //username: string, password: string
    if (this.loginMode){
      console.log("aaaa")
      this.authenticationService.login(this.user.name, this.user.password).subscribe(
        (res) => {
          if(res['jwt']){
            this.tokenService.saveToken(res['jwt']);
            this.router.navigate(['dashboard']);
          } else{
            this.wrongUsernameOrPass = true;
          }

        }
      ,
      (err:Error) => { //TODO, err is not returned from authenticationService; should be fixed, test it!
        if(err.toString()==='Illegal login'){
          this.wrongUsernameOrPass = true;
          console.log(err);
        }
        else{
          Observable.throw(err);
        }
      });
    } else{
      

      this.authenticationService.register(this.user.name, this.user.password, this.user.firstname, this.user.lastname).subscribe(
        (res) => {
          console.log("Registration is: " + res['message'])

        }
     
      );

    }

  }

}
