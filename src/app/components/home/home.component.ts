import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PassingDataService } from 'src/app/services/passing-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hide = true;
  links = ['Login', 'Register'];
  activeLink;
  background: ThemePalette = undefined;

  constructor(private router: Router, private route: ActivatedRoute, private passingDataService : PassingDataService) { }

  ngOnInit(): void {
  }

  broadcastMode(activeLink: string){
    this.activeLink = activeLink;
    let isLogin = activeLink == 'Login' ? true : false;
    if (isLogin) this.router.navigate(['/home/login'], {relativeTo: this.route});
    else this.router.navigate(['/home/register'], {relativeTo: this.route});
   
    this.passingDataService.changeMode(isLogin);
  }



}
