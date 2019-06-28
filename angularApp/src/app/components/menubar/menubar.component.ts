import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notificationService/notification.service';
import { Router } from '@angular/router';
import { UserProfileService } from 'src/app/services/userService/user-profile.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  prom: string;
  userr: any;
  
  constructor(private notServ:NotificationService, public authService: AuthenticationService, private router: Router,private userService: UserProfileService) {  
    }

  ngOnInit() {
    
  }

  loggedIn():string{
    if(localStorage.jwt){
      // if(this.prom == "" || this.prom == null){
      // this.userService.getUserData(localStorage.getItem('name')).subscribe(data => {
        
      //   this.userr = data;
      //   if(this.userr.Name == ""|| this.userr.Name == null)
      //   {
      //     this.prom = this.userr.Email;
      //   }
      //   else
      //   {
      //     this.prom = this.userr.Name;
      //   }
      
      // });
    //}
      //this.prom = localStorage.getItem('name');
    
  }
    return localStorage.jwt;
  }

  logout() {
    this.authService.logout();
    this.prom = "";
    this.router.navigate(["signin"]);
    
    
  }
  get user(): any {
    return localStorage.getItem('role');
  }
  

}
