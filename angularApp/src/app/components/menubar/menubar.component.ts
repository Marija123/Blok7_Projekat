import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  prom: string;
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  loggedIn():string{
    if(localStorage.jwt){
      this.prom = localStorage.getItem('name');
    }
    return localStorage.jwt;
  }

  logout() {
    this.authService.logout();
    
  }
}
