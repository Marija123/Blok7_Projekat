import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

  loggedIn():string{
    return localStorage.jwt;
  }

  logout() {
    this.authService.logout();
    
  }
}
