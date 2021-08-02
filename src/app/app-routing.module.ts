import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuard } from './utils/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  
  { path: 'home', component: HomeComponent, resolve: [AuthGuard], children: [
                                                                             {path: 'login', component: LoginRegisterComponent},
                                                                             {path: 'register', component: LoginRegisterComponent}
                                                                            ] 
  },
  
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard]}, //, canActivate: [AuthGuard]

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
