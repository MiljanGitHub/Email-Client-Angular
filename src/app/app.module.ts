import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './utils/auth-guard';
import { PassingDataService } from './services/passing-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './utils/auth-interceptor';
import { HomeComponent } from './components/home/home.component';
import {MaterialModule} from './utils/material-module';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { FormsModule } from '@angular/forms';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailAddressPipe } from './utils/email-address-pipe';
import { DatePipe } from './utils/date-pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginRegisterComponent,
    HomeComponent,
    DashboardComponent,
    EmailAddressPipe,
    DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    TreeViewModule,
    ReactiveFormsModule
 
    
  ],
  providers: [

    AuthenticationService,
    AuthGuard,
    PassingDataService,
    
    //AccountService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
